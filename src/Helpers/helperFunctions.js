import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import { Bitski } from "bitski";

import supportedChains from "./chains";
// import toast from "react-hot-toast";


export const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID
      }
    },
    torus: {
      package: Torus
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: process.env.REACT_APP_FORTMATIC_KEY
      }
    },
    authereum: {
      package: Authereum
    },
    bitski: {
      package: Bitski,
      options: {
        clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
        callbackUrl: window.location.href + "bitski-callback.html"
      }
    }
  };
  return providerOptions;
};


export function getChainData(chainId) {
  const chainData = supportedChains.filter(
    (chain) => (chain.chain_id === chainId) || (chain.chain_id_hex === chainId)
  )[0];

  if (!chainData) {
    return {};
    // throw new Error("ChainId missing or not supported");
  }
  const API_KEY = process.env.REACT_APP_INFURA_ID;
  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
  
}
  

export const getNetwork = (chainID) => {

  const chainData = getChainData(chainID);
  if(Object.keys(chainData).length === 0){
    return "";
  }
  
  return chainData.network;
  
};


export const subscribeProvider = (
  provider, 
  closeCallBack,
  acctChangeCallBack,
  chainChangeCallBack,
  netChangeCallBack
  ) => {
  if (!provider.on) {
    return;
  }
  provider.on("close", closeCallBack);
  provider.on("accountsChanged", acctChangeCallBack);
  provider.on("chainChanged", chainChangeCallBack);
  provider.on("networkChanged", netChangeCallBack);
};


export const formatWallet = (acct) => {
  const dots = "...";
  const firstFour = acct.substring(0, 4);
  const lastFour = acct.substring(38,42);
  const displayAcct = " " + firstFour + dots + lastFour;
  return displayAcct;
};