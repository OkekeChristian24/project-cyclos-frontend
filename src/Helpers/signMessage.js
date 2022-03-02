import { ethers } from "ethers";

const signMessage = async (message) => {
  try {

    /**
     *
     var message = "Some string"
    var hash = web3.utils.sha3(message)
    var accounts = await web3.eth.getAccounts()
    var signature = await web3.eth.personal.sign(hash, accounts[0])
    or 
    web3.personal.sign(hash, account, function(error, signature) {
      console.log(signature, error)
    })
    /////////////
    var hash = web3.utils.sha3(message)
    var signing_address = await web3.eth.personal.ecRecover(hash, signature)
    or
    var hash = web3.sha3(message)
    web3.personal.ecRecover(hash, signature, function(error, signing_address) {
        console.log(signing_address, error);
    })
     * 
     */

    // console.log({ message });
    // if (!window.ethereum)
    //   throw new Error("No crypto wallet found. Please install it.");

    // await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.detectedProvider);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    // setError(err.message);
    console.log(err);
  }
};

export default signMessage;