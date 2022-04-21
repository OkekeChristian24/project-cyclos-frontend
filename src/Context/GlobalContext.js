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
import toast from 'react-hot-toast';

import web3InfoReducer from "./Reducers/web3InfoReducer";
import productReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";
import paymentReducer from "./Reducers/paymentReducer";
import transactionsReducer from "./Reducers/transactionsReducer";

import { GET_TRANSACTIONS } from "./ActionTypes/transactionsTypes";
import { CLEAR_PRODUCT, SEARCH_PRODUCT } from "./ActionTypes/productTypes";
import { 
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  ACCOUNT_CHANGE,
  CHAIN_CHANGE,
  NETWORK_CHANGE 
} from './ActionTypes/web3InfoTypes';

import { 
  ADD_TO_CART,
  GET_STORED_CART, 
  UPDATE_CART,
  DELETE_CART,
  UPDATE_ITEM,
  REMOVE_ITEM,
  DUPLICATE_ITEM
} from './ActionTypes/cartTypes';

import { GET_TX_DETAILS, MAKE_PAYMENT, PAYMENT_ERROR } from './ActionTypes/paymentTypes';

import {
  getProviderOptions,
  getNetwork,
  subscribeProvider
} from "../Helpers/helperFunctions";
import { getChainData } from "../Helpers/helperFunctions"
import { paymentAddresses } from "../Helpers/addresses"
import paymentABI from "../Helpers/paymentABI";
import { serverHost, axiosConfig} from "../Helpers/backendHost";
import { reqSuccess } from '../Helpers/constants/reqStatus';


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
  try {
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
    
  } catch (error) {
    console.log(error);
  }

})();


const initialCart = {
  totalQty: 0,
  totalPrice: 0,
  products: []
};

// Initial states
const initialProducts = {
  domain: "",
  products: []
};

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {

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
  const [web3Info, web3InfoDispatch] = useReducer(web3InfoReducer, initialWeb3Info);
  const [products, productDispatch] = useReducer(productReducer, initialProducts);
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [payment, paymentDispatch] = useReducer(paymentReducer, {});
  const [userTransactions, userTxnsDispatch] = useReducer(transactionsReducer, []);
  
  const [web3Installed, setWeb3Installed] = useState(false);
  const [web3Modal, setWeb3Modal] = useState({});
  const [detectedProvider, setDetectedProvider] = useState({});
  const [supportedNet, setSupportedNet] = useState(false);



  // Initialize local states
  localWeb3Info.current = web3Info;

  // Initialize web3modal
  const initWeb3Modal = async() => {
    const MetaMProvider = await detectEthereumProvider();
    const web3Modal = new Web3Modal({
      network: web3Info.chainID && getNetwork(web3Info.chainID),
      cacheProvider: true,
      providerOptions: getProviderOptions()
    });
    return web3Modal;
  };


  /* == ACTIONS == */

  // == Payment actions == //
  const GetOrderDetails = async (buyer, orderID, chainID) => {
    try {
      const web3 = initWeb3(window.detectedProvider);
      const paymentAddr = paymentAddresses[chainID];
      const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
      const paymentDetails = await paymentContract.methods.getTransactionDetails(buyer, orderID);
      // getTransactionDetails(addr ess buyer, string memory orderId)
      paymentDispatch({type: GET_TX_DETAILS, payload: { }});
    } catch (error) {
      console.log(error);
    }
    
  };

  // == End of Payment actions == //


  // == Product actions == //
  const searchProducts = async(searchTerm, domain) => {
    
    const term = {
      domain, 
      search_term: searchTerm
    };
    try {
      const res = await axios.post(`${serverHost}/api/products`, term, axiosConfig);
      const responseProducts = res.data.data.search_results;
      const products = responseProducts.filter(product => product.price !== undefined);
      productDispatch({type: SEARCH_PRODUCT, payload: { domain, products }});
    } catch (error) {
      console.log(error);
    }

  };

  const clearProducts = () => {
    productDispatch({type: CLEAR_PRODUCT});
  };

  // == End of Product actions == //


  // == UserTransactions actions == //
  const getUserTransactions = async (userAddress) => {
    try {
      const response = await axios.get(`${serverHost}/api/order/user/${userAddress}`, axiosConfig);
      const { data: resData } = response;
      if(resData.success === reqSuccess){
        userTxnsDispatch({type: GET_TRANSACTIONS, payload: { newState: resData.data }});
        return resData.data;
      }
      throw new Error("Unsuccessful request");
    } catch (error) {
      console.log(error);
      return ([]);
    }
  };

  const removeTransaction = async () => {
    
  };

  // == End of UserTransactions actions == //



  // == Cart actions == //
  const getCart = () => {
    try{
      const productCart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));
      if(productCart){
        cartDispatch({type: GET_STORED_CART, payload: { productCart }});
      }

    }catch(error){
      console.log(error);
    }
  };

  const addToCart = (productToAdd) => {
    try {
      const productCart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));
      if(productCart){
        const index = productCart.products.findIndex(product => product.asin === productToAdd.asin);
        if(index !== -1){
          return false;
        }
      }
      cartDispatch({type: ADD_TO_CART, payload: { product: productToAdd }});
      return true;
      
    } catch (error) {
      return false;
    }
  };

  const updateCart = (updatedState) => {
    cartDispatch({type: UPDATE_CART, payload: { updatedState }});
  };

  const deleteCart = () => {
    cartDispatch({type: DELETE_CART});

  };

  const removeItem = (id) => {
    cartDispatch({type: REMOVE_ITEM, payload: { id }});
  };

  const updateItem = (productToUpdate) => {
    cartDispatch({type: UPDATE_ITEM, payload: { product: productToUpdate }});
  };

  const duplicateItem = (id, newID) => {
    cartDispatch({type: DUPLICATE_ITEM, payload: { id, newID }});

  };

  // == End of Cart actions == //



  // == Wallet provider callbacks == //
  const resetApp = async() => {
    try {
      const { web3 } = web3Info;
      if (web3 && web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
      }
      web3Modal.clearCachedProvider();
    } catch (error) {
      console.log(error);
    }

  };

  const closeCallBack = () => {
    (
      async() => {
        resetApp(); 
      }
    )();
  };

  const acctChangeCallBack = (accounts) => {
    web3InfoDispatch({type: ACCOUNT_CHANGE,  payload: accounts[0]});
  };

  const chainChangeCallBack = async(chainId) => {
    try {
      // const { web3 } = localWeb3Info.current || web3Info;
      const web3 = initWeb3(window.detectedProvider);
      const chainID = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
      
      const networkID = await web3.eth.net.getId();
      // web3InfoDispatch({type: CHAIN_CHANGE,  payload: {chainID}});
      if(getNetwork(chainID) === ""){
        // (() => toast.error(`Chain ID ${chainID} is Not Supported!`))();
        window.location.reload();
        return;
      }
      web3InfoDispatch({type: CHAIN_CHANGE,  payload: {chainID, networkID}});
      // const chainName = getChainData(chainID).chain;
      // (() => toast.success(`You Are Connected To ${chainName}`))();
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
  const netChangeCallBack = async(networkID) => {
    try {
      const web3 = initWeb3(window.detectedProvider);
    
      const chainId = await web3.eth.chainId();
      web3.utils.isHex(chainId);
      const chainID = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
      
  
      if(getNetwork(chainID) === ""){
        (() => toast.error(`Chain ID ${chainID} is Not Supported!`))();
        window.location.reload();
        return;
      }
      web3InfoDispatch({type: NETWORK_CHANGE,  payload: {chainID, networkID}});
  
      const chainName = getChainData(chainID).chain;
      (() => toast.success(`You Are Connected To ${chainName}`))();
      
    } catch (error) {
      console.log(error);
    }
  };

  // == End of Wallet provider callbacks == //


  // == Wallet actions == //
  const connectWallet = async(chainid="") => {
    try {
      let idToCheck = "";
      if(chainid !== ""){
        idToCheck = chainid;
      }else{
        idToCheck = window.detectedProvider.chainId;
      }
      if(getNetwork(idToCheck) === ""){
        // Check if it's 
        // window.detectedProvider.chainId
        // detectedProvider.isMetaMask
        if(detectedProvider.isMetaMask){
          // Show network options modal
          throw {isMetaMask: true}
        }
        setSupportedNet(false);
        
        throw {isMetaMask: false, message: "Network Not Supported!"};
      }
  
      setSupportedNet(true);
      const web3Modal = new Web3Modal({
        network: window.detectedProvider.chainId && getNetwork(window.detectedProvider.chainId),
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
      const chainId = await web3.eth.chainId();
      web3.utils.isHex(chainId);
      const chainID = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
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
      
    } catch (error) {
      console.log(error);
      throw new Error(
    }

  };

  const disconnectWallet = () => {
    web3InfoDispatch({type: DISCONNECT_WALLET});
  };

  // == End of Wallet actions == // 


  useEffect(() => {
    localWeb3Info.current = web3Info;
  }, [web3Info])
  
  // useEffect(() => {
  //   localCart.current = cart;
  // }, [cart])

  
  useEffect(() => {
    (async() => {
      try {
        const MetaMProvider = await detectEthereumProvider();
        window.detectedProvider = MetaMProvider;
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
        
      } catch (error) {
        console.log(error);
      }
      
    })();
  }, []);



  return (
    <GlobalContext.Provider value={{
      web3Info,
      products,
      cart,
      web3Installed,
      supportedNet,
      userTransactions,
      connectWallet,
      disconnectWallet,
      searchProducts,
      clearProducts,
      addToCart,
      getCart,
      updateCart,
      removeItem,
      deleteCart,
      updateItem,
      duplicateItem,
      getUserTransactions
    }}>
      {children}
    </GlobalContext.Provider>
  );

};
