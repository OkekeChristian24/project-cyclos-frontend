import supportedChains from "./chains";

class CustomError extends Error {
    constructor(message) {
      super(message);
      this.custom = true;
    }
}


const getMainnetConfig = (chainID) => {
    const supportedChain = supportedChains.filter(chain => chain.chain_id_hex === chainID)[0];
    const chainConfig = {
        chainId: supportedChain.chain_id_hex,
        chainName: supportedChain.name,
        rpcUrls: [supportedChain.rpc_url],
        nativeCurrency: {
            name: supportedChain.native_currency.name,
            symbol: supportedChain.native_currency.symbol,
            decimals: supportedChain.native_currency.decimals
        },
        blockExplorerUrls: [supportedChain.blockExplorerUrl]
    };

    
    return chainConfig;
};

// chainID is in hex string form
const netSwitchOrAdd = async(MetaMProvider, chainID) => {
    const supportedChainIDs = supportedChains.map(chain => chain.chain_id_hex);
    if(!supportedChainIDs.includes(chainID)){
        return "";
    }
    const mainnetConfig = getMainnetConfig(chainID);
    try{
        const isSwitched = await MetaMProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainID }],
        });
        if(isSwitched !== null){
            throw new CustomError("Network Switch Error");
        }
        return {success: true, message: `Switched To ${mainnetConfig.chainName}`};                
    }catch(switchError){
        
        if(switchError.code === -32603){
            try {
                const isAdded = await MetaMProvider.request({
                    method: 'wallet_addEthereumChain',
                    params: [mainnetConfig]
                });

                if(isAdded !== null){
                    throw new CustomError("Network Add Error");
                }
                return {success: true, message: `${mainnetConfig.chainName} Added`};                
            } catch (addError) {
                if(addError.code === 4001){
                    return {success: false, message: "Network Add Error"};
                }
                return {success: false, message: addError.message};
            }
        }else if(switchError.code === 4902){
            try {
                const isAdded = await MetaMProvider.request({
                    method: 'wallet_addEthereumChain',
                    params: [mainnetConfig]
                });

                if(isAdded !== null){
                    throw new CustomError("Network Add Error");
                }
                return {success: true, message: `${mainnetConfig.chainName} Added`};                

                
            } catch (addError) {
                if(addError.code === 4001){
                    return {success: false, message: "Network Add Rejected"};                
                }                    
                return {success: false, message: "Network Add Error"};                
                
            }
        }else if(switchError.custom){
            return {success: false, message: switchError.message};                
        }else{
            return {success: false, message: "Please Switch To A Supported Network"}
        }
    }
}

export default netSwitchOrAdd;