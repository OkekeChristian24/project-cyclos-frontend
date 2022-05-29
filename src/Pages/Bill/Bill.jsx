import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from 'ethers';
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
import checkShippingAddr from "../../Helpers/checkShippingAddr";
import { initShippingAddr, initShipAddrErr, initShipAddrErrMsg } from "../../Helpers/initsShippingAddr";
import axios from "axios";
import getFeesPercent from "../../Helpers/getFeesPercent";
import companies from "../../Helpers/constants/companies";
import calculate from "../../Helpers/calculate";
import { BIG_TEN } from "../../utils/bignum";


BigNumber.config({ EXPONENTIAL_AT: 1e+9 });


export default function Bill() {

  // Global state
  const { cart, supportedNet, web3Info, deleteCart} = useContext(GlobalContext);
  
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
  const [isBackendErr, setIsBackendErr] = useState(false);
  const [backendErrMsg, setBackendErrMsg] = useState([]);
  const [chargePercent, setChargePercent] = useState(null);
  const [taxPercent, setTaxPercent] = useState(null);
  


  const [phoneNum, setPhoneNum] = useState(undefined);

  
  
  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const checkShippingDetails = () => {
    const {
      isError,
      updatedShipAddrErr,
      updatedShipAddrErrMsg
    } = checkShippingAddr(shippingAddress, phoneNum);

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
    setTokenDecimals(supportedTokens[web3Info.chainID][Number(event.target.value) - 1].decimals);
    await getWalletBalance();
  };

  
  const handlePayment = async() => {
    try{

      if(!(web3Info.connected !== undefined && web3Info.connected)){
        throw new CustomError("Please Connect Wallet");
      }

      if(tokenIndex == null){
        throw new CustomError("Please Select Payment Token");
      }

      if(cart.products.length <= 0){
        throw new CustomError("No Products Selected");
      }

      if(Number(calculate(chargePercent, taxPercent, cart.totalPrice)) > Number(userBalance).toFixed(3)){
        throw new CustomError("Insufficient Token Balance");
      }

      if(checkShippingDetails()){
        throw new CustomError("Fill All Shipping Details");
      }

      setIsPaymentLoading(true);
      const web3 = web3Info.web3;
      const chainId = await web3.eth.chainId();
      const chainID = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
      const paymentAddr = paymentAddresses[chainID];
      if(!paymentAddr){
        throw new CustomError(`Chain ID ${chainID} Is NOT Supported`);
      }
      // Initialise contracts
      const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
      //  const totalPriceBN = (new BigNumber(calculate(chargePercent, taxPercent, cart.totalPrice)).times(BIG_TEN.pow(tokenDecimals)));
      
      const totalPriceBN = (new BigNumber(calculate(chargePercent, taxPercent, cart.totalPrice)).times(BIG_TEN.pow(tokenDecimals)));
      const totalQty = cart.totalQty;
      // let products = [];
      // for(let i=0; i<cart.products.length; i++){
      //   let price = (new BigNumber(cart.products[i].price*10**tokenDecimals).toFixed());
      //   let product = {
      //     asin: cart.products[i].asin,
      //     price: price,
      //     title: cart.products[i].title,
      //     image: cart.products[i].image,
      //     color: cart.products[i].color,
      //     size: cart.products[i].size,
      //     quantity: cart.products[i].quantity
      //   };
      //   products = [...products, product];
      //   product = "";
      // }

      if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
      }
      const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
      const orderID = uuidv4() + web3Info.address + timeStampInMs.toString();
      // makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: buyer})
      const data = await paymentContract.methods.makePayment(orderID, tokenIndex, totalPriceBN.toString(), totalQty).send(
        {
          from: web3Info.address,
          gas: 667016

        }
      );
      const txHash = data.transactionHash;
      await awaitBlockConsensus([web3Info.web3], txHash, 2, 750, async(error, txnReceipt) => {
        try{
          if(error){
            console.log(error);
            // return false;
            throw new CustomError(error.message);
          }
          
          // const paymentDetails = await paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call();
          paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call().then(function(paymentDetails){
            
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
              totalPrice: (BigNumber(cart.totalPrice)).toFixed(15),
              totalQty: Number(cart.totalQty),
              paymentID: String(paymentDetails.paymentID),
              orderID: String(orderID),
              chainID: Number(chainID),
              txnHash: String(txHash),
              tokenIndex: Number(tokenIndex),
              products: cart.products,
              shipping: shippingDetails,
              company: companies[0].name
            };
            console.log('cart: ', cart);
            console.log('paymentDetails: ', paymentDetails);
            console.log('orderBody: ', orderBody);

    
            return axios.post(`${serverHost}/api/order`, orderBody, axiosConfig);

          }).then(function(res){
            setIsPaymentLoading(false);
            // console.log("Server res: ", res);
            if(res.status === 200){
              if(res.data.success === 1){
                deleteCart();
                (() => toast.success("Transaction Successful"))();
              }else{
                (() => toast.error(res.data.message))();
              }
            }else{
              setIsBackendErr(true);
              setBackendErrMsg(res.data.message);
              // The backend API call needs to be retried multiple times
              // until the transaction is successfully stored on the database
              (() => toast.error("Transaction Not Stored"))();
              setIsPaymentLoading(false);
              // throw new CustomError(res.data.message);
              
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
      if(calculate(chargePercent, taxPercent, cart.totalPrice) > Number(userBalance)){
        throw new CustomError("Insufficient Token Balance");
      }
      
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        setIsApprovalLoading(true);
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;    
        const paymentAddr = paymentAddresses[web3Info.chainID];
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        // BIG_TEN
        // console.log('stake value: ', new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString() )
    
        // const totalPriceBN = (new BigNumber(calculate(chargePercent, taxPercent, cart.totalPrice)).times(BIG_TEN.pow(tokenDecimals)));
        // const data = await tokenContract.methods.approve(paymentAddr, totalPriceBN.toFixed()).send({from: web3Info.address});
        const data = await tokenContract.methods.approve(paymentAddr, ethers.constants.MaxUint256).send({from: web3Info.address});
        const txHash = data.transactionHash;
        
        await awaitBlockConsensus([web3Info.web3], txHash, 2, 750, async(error, txnReceipt) => {
          try {
            if(error){
              console.log(error);
              setIsApprovalLoading(false);
              throw new CustomError(error.message);

            }
            setIsApprovalLoading(false);
            setIsApproved(true);
            (() => toast.success("Approval Successful"))();
            return;
            
          } catch (error) {
            console.log(error);
            if(error.custom){
              (() => toast.error(error.message))();
            }else{
              (() => toast.error("Approval Failed"))();
            }
            setIsApprovalLoading(false);
            await checkAllowance();
          }
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
        const tokenDecimals = supportedTokens[web3Info.chainID][tokenIndex - 1].decimals;
        if(tokenAddress === undefined){
          throw new CustomError(`Unsupported Chain ID ${web3Info.chainID}`);
        }
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        const tokenBal = await tokenContract.methods.balanceOf(web3Info.address).call();
        const tokenBalance = (Number((parseFloat(tokenBal)/10**tokenDecimals).toFixed(3)));
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
  
  useEffect(() => {
    (async() => {
      const fees = await getFeesPercent(companies[0].name);
      if(fees !== null){
        setChargePercent(fees.charge);
        setTaxPercent(fees.tax);
      }
    })();
  }, []);

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

  const menuItemStyle = {
    width: "130px"
  }

  const paymentTokenStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  
  return (
    <Hero>
      <div className="bill">
        {/* <div className="bill__header">
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
        </div> */}
        <form className="bill__body">
          <h3>Shipping details</h3>
          {
            isBackendErr
            &&
            <div className="invalidDataError">
              <span onClick={() => setIsBackendErr(false)}>X</span>
              {
                <div className="invalidDataErrorMsg">
                  {
                  backendErrMsg.constructor === Array
                  ?
                  backendErrMsg.map(error => <p>{error}</p>)
                  :
                  <p>{backendErrMsg}</p>
                  }
                </div> 
              }
            </div>
          }
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
          <h6>Total Price: ${Number(calculate(chargePercent, taxPercent, cart.totalPrice)).toFixed(5)}</h6>
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
            
            <Box sx={{ maxWidth: 140, minWidth: 130 }}>
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
                      (token) => (<MenuItem sx={menuItemStyle} key={token.index} value={token.index}>
                        <div style={paymentTokenStyle}>
                        <h6 style={{ display: "inline-block"}}>{token.name}</h6>
                        <img style={{marginLeft: "12px"}} width={25} height={25} src={token.image} alt="token"/>
                        </div>
                      </MenuItem>)
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </>
          }
      
          
          <h6 style={balanceStyling}>{tokenIndex !== null ? "Balance: $" + Number(userBalance).toFixed(3) : ""}</h6>
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
