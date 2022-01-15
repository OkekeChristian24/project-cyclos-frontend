import React, 
{
  createContext,
  useReducer,
  useEffect,
  useRef,
  useState
} from 'react';
import axios from "axios";
import Web3Modal from "web3modal";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

import { SEARCH_PRODUCT } from "./ActionTypes/productTypes";
import web3InfoReducer from "./Reducers/web3InfoReducer";
import productReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";

import { 
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  ACCOUNT_CHANGE,
  CHAIN_CHANGE,
  NETWORK_CHANGE 
} from './ActionTypes/web3InfoTypes';

import { 
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_ITEM,
  DELETE_CART,
  GET_STORED_CART 
} from './ActionTypes/cartTypes';

import {
  getProviderOptions,
  getNetwork,
  subscribeProvider
} from "../Helpers/helperFunctions";
import toast from 'react-hot-toast';

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.custom = true;
  }
}


// Initialize web3
function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

let initialWeb3Info = {};

(async() => {
  
  const WProvider = await detectEthereumProvider();
  if(WProvider === window.ethereum || window.web3){
    const web3 = initWeb3(WProvider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkID = await web3.eth.net.getId();
    const chainID = await web3.eth.chainId();
    initialWeb3Info = {
      web3,
      provider: WProvider,
      networkID,
      chainID,
      address,
      connected: false,
      showModal: false,
    };
  }else{
    initialWeb3Info = {

      networkID: null,
      chainID: null,
      web3: null,
      provider: null,
      address: "",
      connected: false,
      showModal: false,
    };
  
  }

})();


const initialCart = {
  totalQty: 0,
  totalPrice: 0,
  products: []
};

// Initial states
const initialProducts = [];

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  console.log("Injected web3: ", window.ethereum ? window.ethereum : window.web3);

  // Provider Local States
  const localWeb3Info =  useRef({});

  // Setting initial cart state
  var initialCartState
  const response = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));
  if(response !== null && response.products.length > 0){
    initialCartState = response;
  }else{
    initialCartState = initialCart;
  }

  
  // Global States and Dispatches
  console.log(typeof initialWeb3Info);
  const [web3Info, web3InfoDispatch] = useReducer(web3InfoReducer, initialWeb3Info);
  const [products, productDispatch] = useReducer(productReducer, initialProducts);
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [web3Installed, setWeb3Installed] = useState(false);
  const [web3Modal, setWeb3Modal] = useState({});
  const [detectedProvider, setDetectedProvider] = useState({});
  const [supportedNet, setSupportedNet] = useState(false);



  // Initialize local states
  localWeb3Info.current = web3Info;

  // Initialize web3modal
  const initWeb3Modal = async() => {
    const MetaMProvider = await detectEthereumProvider();
    console.log("MetaMProvider: ", MetaMProvider);
    const web3Modal = new Web3Modal({
      network: web3Info.chainID && getNetwork(web3Info.chainID),
      cacheProvider: true,
      providerOptions: getProviderOptions()
    });
    return web3Modal;
  };


  /* == ACTIONS == */
  // == Product actions == //
  const searchProducts = async(searchTerm) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const term = {
      search_term: searchTerm
    };
    try {
      const res = await axios.post('/api/products', term, config);
      
      // Check if res is a success

      const products = res.data.data.search_results;
      productDispatch({type: SEARCH_PRODUCT, payload: products});
    } catch (error) {
      console.log(error);
    }

  };


  // == Cart actions == //
  const getCart = () => {
    try{
      const productCart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));
      console.log("GlobalContext:getCart(), ", productCart);
      if(productCart){
        cartDispatch({type: GET_STORED_CART, payload: { productCart }});
      }

    }catch(error){
      console.log(error);
    }
  };
  const addToCart = (product) => {
    cartDispatch({type: ADD_TO_CART, payload: { product }});
    
  };
  const updateCart = (updatedState) => {
    cartDispatch({type: UPDATE_CART, payload: { updatedState }});
  };
  const deleteCart = () => {
    cartDispatch({type: DELETE_CART});

  };
  const removeItem = (asin) => {
    cartDispatch({type: REMOVE_ITEM, payload: { asin }});
  };





  // == Wallet provider callbacks == //
  const resetApp = async() => {
    const { web3 } = web3Info;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    web3Modal.clearCachedProvider();

  };

  const closeCallBack = () => {
    resetApp();
  };

  const acctChangeCallBack = (accounts) => {
    web3InfoDispatch({type: ACCOUNT_CHANGE,  payload: accounts[0]});
  };

  const chainChangeCallBack = async(chainID) => {
    const { web3 } = localWeb3Info.current;
    const networkID = await web3.eth.net.getId();
    web3InfoDispatch({type: CHAIN_CHANGE,  payload: {chainID, networkID}});
    window.location.reload();
  };
  
  const netChangeCallBack = async(networkID) => {
    const { web3 } = localWeb3Info.current;
    const chainID = await web3.eth.chainId();
    web3InfoDispatch({type: NETWORK_CHANGE,  payload: {chainID, networkID}});
    window.location.reload();
  };

  // Wallet action
  const connectWallet = async() => {
    if(getNetwork(detectedProvider.chainId) === ""){
      // Check if it's MetaMask
      if(detectedProvider.isMetaMask){
        // Show network options modal
        throw {isMetaMask: true}
      }
      setSupportedNet(false);
      
      throw {isMetaMask: false, message: "Network Not Supported!"};
    }

    setSupportedNet(true);
    const web3Modal = new Web3Modal({
      network: web3Info.chainID && getNetwork(web3Info.chainID),
      cacheProvider: true,
      providerOptions: getProviderOptions()
    });
    setWeb3Modal(web3Modal);
    const provider = await web3Modal.connect();
    subscribeProvider(
      provider, 
      closeCallBack,
      acctChangeCallBack,
      chainChangeCallBack,
      netChangeCallBack
    );

    const web3 = initWeb3(provider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkID = await web3.eth.net.getId();
    const chainID = await web3.eth.chainId();

    const details = {
      web3,
      provider,
      networkID,
      chainID,
      address,
      connected: true,
      isMetaMask: provider.isMetaMask
    };

    web3InfoDispatch({type: CONNECT_WALLET,  payload: details});

  };
  const disconnectWallet = () => {

    web3InfoDispatch({type: DISCONNECT_WALLET});

  };

  useEffect(() => {
    localWeb3Info.current = web3Info;
  }, [web3Info])
  
  // useEffect(() => {
  //   localCart.current = cart;
  // }, [cart])
  
  useEffect(() => {
    (async() => {
      const MetaMProvider = await detectEthereumProvider();
      if(MetaMProvider === window.ethereum){
        setWeb3Installed(true);
        setDetectedProvider(MetaMProvider);
        if(getNetwork(MetaMProvider.chainId) === ""){
          setSupportedNet(false);
        }else{
          setSupportedNet(true);
        }
      }else if(MetaMProvider === window.web3){
        setWeb3Installed(true);
        setDetectedProvider(MetaMProvider);
      }
      
    })();
  }, []);



  return (
    <GlobalContext.Provider value={{
      web3Info,
      products,
      cart,
      detectedProvider,
      web3Installed,
      supportedNet,
      connectWallet,
      disconnectWallet,
      searchProducts,
      addToCart,
      getCart,
      updateCart,
      removeItem,
      deleteCart
    }}>
      {children}
    </GlobalContext.Provider>
  );

};