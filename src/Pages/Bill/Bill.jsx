import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import BigNumber from "bignumber.js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import "react-phone-number-input/style.css"
import PhoneInput from 'react-phone-number-input'
import "../../CustomStyles/billStyle.css";

// import Select from "react-select";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import { paymentAddresses, supportedTokens } from "../../Helpers/addresses";
import paymentABI from "../../Helpers/paymentABI";
import { awaitBlockConsensus } from "../../Helpers/awaitTxn";
import { CustomError } from "../../Helpers/customError";
import tokenABI from "../../Helpers/tokenABI";
import { serverHost, axiosConfig} from "../../Helpers/backendHost";
import { validEmailRegex, validStreetReg, validCityReg, validStateReg, validCountryReg, validPostalCodeReg} from "../../Helpers/regExps";
import { initShippingAddr, initShipAddrErr, initShipAddrErrMsg } from "../../Helpers/initsShippingAddr";
import Autocomplete from "./Autocomplete";
import { City } from "./Autocomplete/City";
import { Country } from "./Autocomplete/Country";
import axios from "axios";





export default function Bill() {

  // Global state
  const { cart, supportedNet, connectWallet, web3Installed, web3Info, deleteCart} = useContext(GlobalContext);
  
  // Local component state
  const [tokenIndex, setTokenIndex] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState(initShippingAddr);
  const [shippingAddrError, setShippingAddrError] = useState(initShipAddrErr);
  const [shipAddrErrMsg, setShipAddrErrMsg] = useState(initShipAddrErrMsg);


  const [phoneNum, setPhoneNum] = useState(undefined);

  
  
  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const checkShippingAddr = () => {
    let isError = false;
    let updatedShipAddrErr = {};
    let updatedShipAddrErrMsg = {};
    
    Object.keys(shippingAddress).forEach(function(key) {
      
      if(key === "phone"){
        if(phoneNum === undefined){
          isError = true;
          updatedShipAddrErr = {
            ...updatedShipAddrErr,
            [key]: true
          };
          updatedShipAddrErrMsg = {
            ...updatedShipAddrErrMsg,
            [key]: "This Field Is Required"
          };
        }else{
          updatedShipAddrErr = {
            ...updatedShipAddrErr,
            [key]: false
          };
        }
        return;
      }
      
      if (shippingAddress[key] === "") {
        isError = true;
        updatedShipAddrErr = {
          ...updatedShipAddrErr,
          [key]: true
        };
        updatedShipAddrErrMsg = {
          ...updatedShipAddrErrMsg,
          [key]: "This Field Is Required"
        };
      }else{
        switch(key){
          case "email":
            if(!validEmailRegex.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: "Email is NOT valid"
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }

            break;
          case "street":
            console.log("Street: ", (shippingAddress[key]));
            console.log("Regex: ", validStreetReg.test(shippingAddress[key]));
            if(!validStreetReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Invalid Inputs Are NOT Allowed`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "city":
            if(!validCityReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `City Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "state":
            if(!validStateReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `State Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "country":
            if(!validCountryReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Country Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "postalCode":
            if(!validPostalCodeReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Postal Code Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          default:
            break;
        }
      }
    });

    setShippingAddrError({
      ...shippingAddrError,
      ...updatedShipAddrErr
    });
    setShipAddrErrMsg({
      ...shipAddrErrMsg,
      ...updatedShipAddrErrMsg
    });

    return isError;
  };

  const handleChange = async(event) => {
    setTokenIndex(event.target.value);
    setTokenDecimals(supportedTokens[web3Info.chainID][event.target.value - 1].decimals);
    await getWalletBalance();
  };

  
  const handlePayment = async() => {
    // console.log("shippingAddrError: ", shippingAddrError);
    try{
      if(web3Info.connected !== undefined && web3Info.connected){
        if(tokenIndex == null){
          throw new CustomError("Please Select Payment Token");
        }

        if(cart.products.length <= 0){
          throw new CustomError("No Products Selected");
        }

        if(cart.totalPrice > Number(userBalance).toFixed(3)){
          throw new CustomError("Insufficient Token Balance");
        }

        if(checkShippingAddr()){
          throw new CustomError("Fill All Shipping Details");
        }

        setIsPaymentLoading(true);
        const web3 = web3Info.web3;
        const chainID = await web3.eth.chainId();
        const paymentAddr = paymentAddresses[chainID];
        if(!paymentAddr){
          throw new CustomError(`Chain ID ${chainID} Is NOT Supported`);
        }
        // Initialise contracts
        const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
        const totalPriceBN = (new BigNumber(cart.totalPrice*10**tokenDecimals));
        const totalQty = cart.totalQty;
        let products = [];
        for(let i=0; i<cart.products.length; i++){
          let price = (new BigNumber(cart.products[i].price*10**tokenDecimals).toFixed(0));
          let product = {
            asin: cart.products[i].asin,
            price: price,
            quantity: cart.products[i].quantity
          };
          // console.log(product);
          products = [...products, product];
          product = "";
        }
        // console.log("products: ", products);

        if (!Date.now) {
          Date.now = function() { return new Date().getTime(); }
        }
        const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
        const orderID = uuidv4() + web3Info.address + timeStampInMs.toString();
        // makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: buyer})
        const data = await paymentContract.methods.makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: web3Info.address});
        const txHash = data.transactionHash;
        awaitBlockConsensus([web3Info.web3], txHash, 6, 750, async(error, txnReceipt) => {
          try{
            if(error){
              console.log(error);
              // return false;
              throw new CustomError(error.message);
            }
            
            // First
            // const paymentDetails = await paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call();
            paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call().then(function(paymentDetails){
              console.log("paymentDetails: ", paymentDetails);
              
              const shippingDetails = {
                email: shippingAddress.email,
                phone: phoneNum,
                street: shippingAddress.street,
                city: shippingAddress.city,
                state: shippingAddress.state,
                country: shippingAddress.country,
                postalCode: shippingAddress.postalCode
              };

              const orderBody = {
                buyer: String(web3Info.address),
                totalPrice: (Number(cart.totalPrice)).toFixed(5),
                totalQty: Number(cart.totalQty),
                paymentID: String(paymentDetails.paymentID),
                orderID: String(orderID),
                chainID: Number(chainID),
                txnHash: String(txHash),
                tokenIndex: Number(tokenIndex),
                products: cart.products,
                shipping: shippingDetails
              };

                          
      
              // console.log("Order for backend: ", orderBody);
              return axios.post(`${serverHost}/api/order`, orderBody, axiosConfig);

            }).then(async function(res){
              console.log("Server res: ", res);
              if(res.status === 200){
                if(res.data.success === 1){
                  deleteCart();
                  (() => toast.success("Transaction Successful"))();
                }else{
                  (() => toast.error(res.data.message))();
                }
                setIsPaymentLoading(false);
              }else{
                // The backend API call needs to be retried multiple times
                // until the transaction is successfully stored on the database
                console.log("Response data: ", res.data);
                (() => toast.error("Transaction Not Stored"))();
                setIsPaymentLoading(false);
                // throw new CustomError(res.data.message);
                // Here
              }
            }).catch(function(error){
              console.log(error);
              setIsPaymentLoading(false);
              (() => toast.error("Error In Storing Transaction"))();
            }).finally(async function(){
              setIsPaymentLoading(false);
              await checkAllowance();
              await getWalletBalance();

            });
            setIsPaymentLoading(false);          
            await checkAllowance();
            await getWalletBalance();
          }catch(error){
            console.log(error);
            if(error.custom){
              (() => toast.error(error.message))();
            }else{
              (() => toast.error("Payment Failed"))();
            }
            setIsPaymentLoading(false);
            await checkAllowance();
            await getWalletBalance();
              
          }
          
          
        });
        // setIsPaymentLoading(false);
        // console.log("After awaitTxn returned => ", awaitRes);

        // const response = await makePayment(tokenDecimals, tokenIndex, cart, web3Info.address);
        // if(response.success){
        //   (() => toast.success(response.message))();
        // }else{
        //   (() => toast.error(response.message))();
        // }
        // await checkAllowance();
        // await getWalletBalance();

      }else{
        throw new CustomError("Please Connect Wallet");
      }
      
    }catch(error){
      console.log(error);
      setIsPaymentLoading(false);
      await checkAllowance();
      await getWalletBalance();
      if(error.custom){
        (() => toast.error(error.message))();
        return;
      }
      if(error.code === 4001){
        (() => toast.error("Transaction Rejected"))();
        return;
      }
      if(error.code === -32603){
        (() => toast.error("Internal Error"))();
        return;
      }
      (() => toast.error("Payment Failed"))();
    }
  };

  
  const handleApproval = async() => {
    
    try{
      if(web3Info.connected === undefined){
        throw new CustomError("Please Connect Wallet");
      }

      if(tokenIndex == null){
        throw new CustomError("Please Select Token");
      }

      if(isApproved){
        return;
      }
  
      if(cart.products.length <= 0){
        throw new CustomError("No Products Selected");
      }
      if(cart.totalPrice > Number(userBalance).toFixed(3)){
        throw new CustomError("Insufficient Token Balance");
      }
      
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        //
        setIsApprovalLoading(true);
        //
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;    
        const paymentAddr = paymentAddresses[web3Info.chainID];
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        const totalPriceBN = (new BigNumber(cart.totalPrice*10**tokenDecimals));
        const data = await tokenContract.methods.approve(paymentAddr, totalPriceBN).send({from: web3Info.address});
        const txHash = data.transactionHash;
        awaitBlockConsensus([web3Info.web3], txHash, 6, 750, (error, txnReceipt) => {
          if(error){
            throw new Error("Approval Failed");
          }
          setIsApproved(true);
          (() => toast.success("Approval Successful"))();
          return;
        });
      }
    }catch(error){
      console.log(error);
      setIsApprovalLoading(false);
      if(error.code === 4001){
        (() => toast.error("Transaction Signing Rejected"))();
        return;
      }
      if(error.custom){
        (() => toast.error(error.message))();
        return;
      }
      (() => toast.error("Approval Failed"))();
    }
  };

  const checkAllowance = async() => {
    try{
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;    
        const paymentAddr = paymentAddresses[web3Info.chainID];
        if(tokenAddress === undefined || paymentAddr === undefined){
          throw new CustomError(`Unsupported Chain ID ${web3Info.chainID}`);
        }
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        const allowance = new BigNumber(await tokenContract.methods.allowance(web3Info.address, paymentAddr).call());
        const totalPriceBN = (new BigNumber(cart.totalPrice*10**tokenDecimals));
        if((allowance.minus(totalPriceBN)).toNumber() < 0){
          setIsApproved(false);
        }else{
          setIsApproved(true);
        }
      }
    }catch(error){
      console.log(error);
      setIsApproved(false);
    }
    
  };
  


  const getWalletBalance = async() => {
    try{
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;
        if(tokenAddress === undefined){
          throw new CustomError(`Unsupported Chain ID ${web3Info.chainID}`);
        }
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        const tokenBal = await tokenContract.methods.balanceOf(web3Info.address).call();
        const tokenBalance = web3Info.web3.utils.toBN(Number((parseFloat(tokenBal)/10**18).toFixed(0)));
        setUserBalance(tokenBalance);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    (async() => {
      if(tokenIndex != null){
        await getWalletBalance();
        await checkAllowance();
      }
    })();
  }, [tokenIndex, web3Info.address]);
  
  useEffect(() => {
    setTokenIndex(null);
  }, [web3Info.chainID]);
  
  // Payment Styling
  const payStyling = {
    width: "100%",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"

  };
  const balanceStyling = {
    color: "black",
    margin: "0 5px",
    marginLeft: "10px"

  };

  // Error msg styling
  const errMsgStyle = {
    color: "red"
  };

  
  // console.log("web3Info.connected", web3Info.connected);
  // console.log("web3Info.chainID", web3Info.chainID);
  // console.log("typeof web3Info.chainID", typeof web3Info.chainID);
  return (
    <Hero>
      <div className="bill">
        <div className="bill__header">
          <div className="bill__header-icon">
            <svg
              aria-hidden="true"
              viewBox="0 0 512 512"
            >
              <path
                fill=""
                d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
              ></path>
            </svg>
          </div>
          <div className="bill__header-text">
            Have a Coupon?
            <span> Click here to enter your code</span>
          </div>
        </div>
        <form className="bill__body">
          <h3>Shipping details</h3>
          <div className="input__row">
            <div className="input__outer">
              <label htmlFor="email">Email</label>
              <input type="email" style={{border: shippingAddrError.email ? "1px solid red" : "none"}} name="email" value={shippingAddress.email} onChange={handleShippingChange} placeholder="Email" />
              <small style={errMsgStyle}>{shippingAddrError.email ? shipAddrErrMsg.email : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="phone">
                Phone number
                <small style={{opacity: "0.8", color: "black", marginLeft: "15px"}}>(e.g. +2348123456789)</small>
              </label>
              {/* <input type="text" style={{border: shippingAddrError.phone ? "1px solid red" : "none"}} name="phone" value={shippingAddress.phone} onChange={handleShippingChange} placeholder="Phone" /> */}
              <PhoneInput name="phone" placeholder="Enter phone number" value={phoneNum} onChange={setPhoneNum}/>
              <small style={errMsgStyle}>{shippingAddrError.phone ? shipAddrErrMsg.phone : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="street">Street</label>
              <input type="text" style={{border: shippingAddrError.street ? "1px solid red" : "none"}} name="street" value={shippingAddress.street} onChange={handleShippingChange} placeholder="Street" />
              <small style={errMsgStyle}>{shippingAddrError.street ? shipAddrErrMsg.street : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="city">Town/City</label>
              {/* <Autocomplete list={City} placeholder={"Town/City"} /> */}
              <input type="text" style={{border: shippingAddrError.city ? "1px solid red" : "none"}} name="city" value={shippingAddress.city} onChange={handleShippingChange} placeholder="Town/City" />
              <small style={errMsgStyle}>{shippingAddrError.city ? shipAddrErrMsg.city : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="state">State</label>
              <input type="text" style={{border: shippingAddrError.state ? "1px solid red" : "none"}} name="state" value={shippingAddress.state} onChange={handleShippingChange} placeholder="State" />
              <small style={errMsgStyle}>{shippingAddrError.state ? shipAddrErrMsg.state : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="country">Country/region</label>
              {/* <Autocomplete list={Country} placeholder={"Country/region"} /> */}
              <input type="text" style={{border: shippingAddrError.country ? "1px solid red" : "none"}} name="country" value={shippingAddress.country} onChange={handleShippingChange} placeholder="Country/region" />
              <small style={errMsgStyle}>{shippingAddrError.country ? shipAddrErrMsg.country : ""}</small>
            </div>
            <div className="input__outer">
              <label htmlFor="postalCode">Postal code</label>
              <input type="text" style={{border: shippingAddrError.postalCode ? "1px solid red" : "none"}} name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingChange} placeholder="Postal code" />
              <small style={errMsgStyle}>{shippingAddrError.postalCode ? shipAddrErrMsg.postalCode : ""}</small>
            </div>
          </div>
        </form>
        <div style={{color: "black", margin: "15px 5px 25px 5px"}}>
          {
          cart != null 
          && 
          cart.totalPrice != null
          &&
          cart.totalPrice !== 0
          &&
          <h5>Total Price: ${cart.totalPrice.toFixed(3)}</h5>
          }
        </div>
        <div style={payStyling}>

          {
          web3Info.connected !== undefined
          &&
          web3Info.connected
          &&
          supportedNet
          &&
          <>
            
            <Box sx={{ maxWidth: 200, minWidth: 160 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Payment Token</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tokenIndex ?? " "}
                  label="Payment Token"
                  onChange={handleChange}
                >
                  {
                    supportedNet
                    &&
                    supportedTokens[web3Info.chainID].map(
                      (token) => <MenuItem key={token.index} value={token.index}><h5>{token.name}</h5></MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </>
          }
      
          
          <h5 style={balanceStyling}>{tokenIndex !== null ? "Balance: $" + Number(userBalance).toFixed(3) : ""}</h5>
        </div>
        <div className="bill__footer">
          {
            isApproved
            ?
            <button disabled={isPaymentLoading} onClick={handlePayment} className="button primary">{isPaymentLoading ? "Processing..." : "Make Payment"}</button>
            :
            <button disabled={isApprovalLoading} onClick={handleApproval} className="button primary">{isApprovalLoading ? "Approving..." : "Approve Payment"}</button>
          }
        </div>
      </div>
    </Hero>
  );
}
