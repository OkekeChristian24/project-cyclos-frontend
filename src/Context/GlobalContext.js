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
import BigNumber from "bignumber.js";
import detectEthereumProvider from '@metamask/detect-provider';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'

import { SEARCH_PRODUCT } from "./ActionTypes/productTypes";
import web3InfoReducer from "./Reducers/web3InfoReducer";
import productReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";
import paymentReducer from "./Reducers/paymentReducer";

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
  REMOVE_ITEM
} from './ActionTypes/cartTypes';

import { GET_TX_DETAILS, MAKE_PAYMENT, PAYMENT_ERROR } from './ActionTypes/paymentTypes';

import {
  getProviderOptions,
  getNetwork,
  subscribeProvider
} from "../Helpers/helperFunctions";
import { getChainData } from "../Helpers/helperFunctions"
import { supportedTokens, paymentAddresses } from "../Helpers/addresses"
import tokenABI from "../Helpers/tokenABI";
import paymentABI from "../Helpers/paymentABI";

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.custom = true;
  }
}

// Axios config
const config = {
  headers: {
    'Content-Type': 'application/json'
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
  const makePayment = async(tokenIndex, cart, buyer) => {
    //let decimals = web3.utils.toBN(18);
    //let amount = web3.utils.toBN(100);
    //et value = amount.mul(web3.utils.toBN(10).pow(decimals));
    //
    try {
      //
      const web3 = initWeb3(window.detectedProvider);
      // const decimals = web3.utils.toBN(18);
      const decimals = 18;
      const chainID = await web3.eth.chainId();
      const paymentAddr = paymentAddresses[chainID];
      if(!paymentAddr){
        throw {custom: true, message: `${chainID} Is NOT A Supported Chain`};
      }
      console.log("makePayment supportedTokens with tokenIndex: ", supportedTokens[chainID][tokenIndex - 1]);
      const tokenAddress = supportedTokens[chainID][tokenIndex - 1].address;
      const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
      const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
      /*
      var decimals = 12;
      var value = (0.001*(10**decimals)).toString();
      var amount = web3.utils.toBN(value);

      x = new BigNumber(456.789)
      x.toString()
      */
      const priceValue = ((cart.totalPrice*(10**decimals)).toFixed(20));
      // const priceValue = new BigNumber((cart.totalPrice*(10**decimals))).toString();
      console.log("typeof priceValue: ", typeof priceValue);
      console.log("priceValue: ", Number(priceValue).toFixed(20));
      // const totalPrice = web3.utils.toBN(Number(priceValue)).toString();
      const totalPrice = priceValue;
      const approvalReceipt = await tokenContract.methods.approve(paymentAddr, priceValue).send({from: buyer});
      console.log(approvalReceipt.events.Approval);
      if(typeof approvalReceipt.events.Approval === undefined){
        throw {custom: true, message: "Approve Contract To Make Payment"};
      }

      const totalQty = cart.totalQty;
      const products = [];
      for(let i=0; i<cart.products.length; i++){
        const product = {
          asin: cart.products[i].asin,
          price: cart.products[i].price,
          quantity: cart.products[i].quantity
        };
        products.push(product);
      }

      if(products.length <= 0){
        throw {custom: true, message: "No products were selected"};
      }
      
      if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
      }
      const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
      const orderID = uuidv4() + buyer + timeStampInMs.toString();
      console.log("Order ID: ", orderID);
      const paymentReceipt = await paymentContract.methods.makePayment(orderID, tokenIndex, totalPrice, totalQty, products).send({from: buyer});
      console.log(paymentReceipt.events.TransactionMade);
      console.log(paymentReceipt.events.TransactionMade.returnValues.orderID);
      console.log(paymentReceipt.events.TransactionMade.returnValues.paymentID);
      if(typeof paymentReceipt.events.TransactionMade === "undefined"){
        throw {custom: true, message: "Transaction Failed"};
      }

      paymentDispatch(
        {
          type: MAKE_PAYMENT,
          payload: {
            paymentID: paymentReceipt.events.TransactionMade.returnValues.paymentID,
            orderID: paymentReceipt.events.TransactionMade.returnValues.orderID,
            buyer: paymentReceipt.events.TransactionMade.returnValues.buyer
          }
        }
      );

      // Send txn info to the backend
      // using axios
      ///api/order
      /*
      * buyer (string)
      * totalPrice (int)
      * totalQty (int)
      * paymentID (string)
      * orderID (string)

      * txnHash (string)

      * tokenIndex (int)

      * products[i].productLink (string)
      * products[i].quantity (int)
      * itemWeight (int)
      * price (int)
      */

      const orderBody = {
        buyer: buyer,
        totalPrice: cart.totalPrice,
        totalQty: 0,
        paymentID: paymentReceipt.events.TransactionMade.returnValues.paymentID,
        orderID: orderID,
        txnHash: paymentReceipt.events.TransactionMade.returnValues.paymentID,
        tokenIndex: tokenIndex,
        products: products
      };
      const res = await axios.post('http://localhost:5000/api/order', orderBody, config);
      if(res.data.success === 1){
        return {success: true, message: "Transaction Successful"};
      }
      
      return {success: false, message: res.data.message};
      
    } catch (error) {
      console.log(error);
      if(error.custom){
        paymentDispatch({type: PAYMENT_ERROR, payload: error.message});
        return {success: false, message: error.message};
      }
      paymentDispatch({type: PAYMENT_ERROR, payload: "Payment Unsuccessful"});
      return {success: false, message: "Payment Unsuccessful"};

    }
      

  };

  const GetOrderDetails = async (buyer, orderID, chainID) => {
    try {
      const web3 = initWeb3(window.detectedProvider);
      const paymentAddr = paymentAddresses[chainID];
      const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
      const paymentDetails = await paymentContract.methods.getTransactionDetails(buyer, orderID);
      console.log(paymentDetails);
      // getTransactionDetails(addr ess buyer, string memory orderId)
      paymentDispatch({type: GET_TX_DETAILS, payload: { }});
    } catch (error) {
      //
    }
    
  };

  // == Product actions == //
  const searchProducts = async(searchTerm) => {
    
    const term = {
      search_term: searchTerm
    };
    try {
      const res = await axios.post('http://localhost:5000/api/products', term, config);
      
      console.log("searchProduct: ", res);
      
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
      if(productCart){
        cartDispatch({type: GET_STORED_CART, payload: { productCart }});
      }

    }catch(error){
      console.log(error);
    }
  };
  const addToCart = (productToAdd) => {
    const productCart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));
    if(productCart){
      const index = productCart.products.findIndex(product => product.asin === productToAdd.asin);
      if(index !== -1){
        return false;
      }
    }
    cartDispatch({type: ADD_TO_CART, payload: { product: productToAdd }});
    return true;
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

  const updateItem = (productToUpdate) => {
    cartDispatch({type: UPDATE_ITEM, payload: { product: productToUpdate }});
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
    // const { web3 } = localWeb3Info.current || web3Info;
    const web3 = initWeb3(window.detectedProvider);
    const networkID = await web3.eth.net.getId();
    web3InfoDispatch({type: CHAIN_CHANGE,  payload: {chainID, networkID}});
    web3InfoDispatch({type: CHAIN_CHANGE,  payload: {chainID}});
    if(getNetwork(chainID) === ""){
      // (() => toast.error(`Chain ID ${chainID} is Not Supported!`))();
      window.location.reload();
      // return;
    }
    // const chainName = getChainData(chainID).chain;
    // (() => toast.success(`You Are Connected To ${chainName}`))();
  };
  
  const netChangeCallBack = async(networkID) => {
    // const { web3 } = localWeb3Info.current || web3Info;
    const web3 = initWeb3(window.detectedProvider);
    const chainID = await web3.eth.chainId();
    web3InfoDispatch({type: NETWORK_CHANGE,  payload: {chainID, networkID}});

    if(getNetwork(chainID) === ""){
      (() => toast.error(`Chain ID ${chainID} is Not Supported!`))();
      window.location.reload();
      return;
    }
    const chainName = getChainData(chainID).chain;
    (() => toast.success(`You Are Connected To ${chainName}`))();
  };

  // Wallet action
  const connectWallet = async(chainid="") => {
    let idToCheck = "";
    if(chainid !== ""){
      idToCheck = chainid;
    }else{
      idToCheck = detectedProvider.chainId;
    }
    if(getNetwork(idToCheck) === ""){
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
      
    })();
  }, []);



  return (
    <GlobalContext.Provider value={{
      web3Info,
      products,
      cart,
      web3Installed,
      supportedNet,
      connectWallet,
      disconnectWallet,
      searchProducts,
      addToCart,
      getCart,
      updateCart,
      removeItem,
      deleteCart,
      updateItem,
      makePayment
    }}>
      {children}
    </GlobalContext.Provider>
  );

};