import { useContext } from "react";
import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  ACCOUNT_CHANGE,
  CHAIN_CHANGE,
  NETWORK_CHANGE
} from "../ActionTypes/web3InfoTypes";

/**
 const initialWeb3Info = {
    networkID: null,
    chainID: null,
    web3: null,
    provider: null,
    address: "",
    connected: false,
    showModal: false,
  };

 */



const web3InfoReducer = (state = {}, action) => {
      switch(action.type){
          case CONNECT_WALLET:

            return {
                ...state,
                web3: action.payload.web3,
                provider: action.payload.provider,
                networkID: action.payload.networkID,
                chainID: action.payload.chainID,
                address: action.payload.address,
                connected: true,
                isMetaMask: action.payload.isMetaMask
              };
          case ACCOUNT_CHANGE:
            return {
              ...state,
              address: action.payload
            };
          case CHAIN_CHANGE:
            return {
              ...state,
              chainID: action.payload.chainID,
              networkID: action.payload.networkID

            };
          case NETWORK_CHANGE:
            return {
              ...state,
              chainID: action.payload.chainID,
              networkID: action.payload.networkID
            };
          case DISCONNECT_WALLET: 
            return {
                ...state,
                provider: null,
                networkID: null,
                chainID: null,
                address: "",
                connected: false,
                isMetaMask: false
            };
          default:
              return state;
      }
  };

  export default web3InfoReducer;