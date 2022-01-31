import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import BigNumber from "bignumber.js";
import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
// import Select from "react-select";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import { paymentAddresses, supportedTokens } from "../../Helpers/addresses";
import paymentABI from "../../Helpers/paymentABI";
import { awaitBlockConsensus } from "../../Helpers/awaitTxn";
import { CustomError } from "../../Helpers/customError";
import tokenABI from "../../Helpers/tokenABI";
import { serverHost, axiosConfig} from "../../Helpers/backendHost";
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
  const [email, setEmail] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);

  /**
   * email,
   * phone,
   * street,
   * town,
   * state,
   * country,
   * postalcode
   * 
   */

  const handleChange = async(event) => {
    setTokenIndex(event.target.value);
    setTokenDecimals(supportedTokens[web3Info.chainID][event.target.value - 1].decimals);
    await getWalletBalance();
  };

  
  const handlePayment = async() => {
    try{
      if(web3Info.connected !== undefined && web3Info.connected){
        if(tokenIndex == null){
          (() => toast.error(`Please Select Payment Token`))();
          return;
        }
        if(cart.totalQty > userBalance){
          (() => toast.error(`Insufficient Token Balance`))();
          return;
        }
        if(cart.products.length <= 0){
          throw new CustomError("No Products Selected");
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
          console.log(price);
          let product = {
            asin: cart.products[i].asin,
            price: price,
            quantity: cart.products[i].quantity
          };
          console.log(product);
          products = [...products, product];
          product = "";
        }
        console.log("products: ", products);

        if (!Date.now) {
          Date.now = function() { return new Date().getTime(); }
        }
        const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
        const orderID = uuidv4() + web3Info.address + timeStampInMs.toString();
        // makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: buyer})
        const data = await paymentContract.methods.makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: web3Info.address});
        console.log("Data: ", data);
        const txHash = data.transactionHash;
        awaitBlockConsensus([web3Info.web3], txHash, 6, 750, async(error, txnReceipt) => {
          try{
            if(error){
              console.log("Await Txn Error: ", error);
              // return false;
              throw new CustomError(error.message);
            }
            
            // First
            // const paymentDetails = await paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call();
            paymentContract.methods.getTransactionDetails(web3Info.address, orderID).call().then(function(paymentDetails){
              console.log("paymentDetails: ", paymentDetails);
              const orderBody = {
                buyer: String(web3Info.address),
                totalPrice: (Number(cart.totalPrice)).toFixed(5),
                totalQty: Number(cart.totalQty),
                paymentID: String(paymentDetails.paymentID),
                orderID: String(orderID),
                chainID: Number(chainID),
                txnHash: String(txHash),
                tokenIndex: Number(tokenIndex),
                products: cart.products
              };
      
              console.log("Order for backend: ", orderBody);
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
    if(web3Info.connected === undefined){
      (() => toast.error("Please Connect Wallet"))();
      return;
    }

    if(tokenIndex == null){
      (() => toast.error("Please Select Token"))();
      return;
    }

    // if(cart.totalPrice.toFixed(3) > userBalance){
    //   (() => toast.error("Insufficient Token Balance"))();
    //   return;
    // }

    if(isApproved){
      return;
    }

    try{
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        //
        setIsApprovalLoading(true);
        //
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;    
        const paymentAddr = paymentAddresses[web3Info.chainID];
        console.log("tokenAddress: ", tokenAddress);
        console.log("paymentAddr: ", paymentAddr);
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
    console.log("checkAllowance called...");
    try{
      if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
        const tokenAddress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;    
        const paymentAddr = paymentAddresses[web3Info.chainID];
        console.log("chainID: ", web3Info.chainID);
        console.log("typeof chainID: ", typeof web3Info.chainID);
        console.log("tokenAddress: ", tokenAddress);
        console.log("tokenAddress: ", paymentAddr);
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
        console.log("tokenAddress: ", tokenAddress);
        if(tokenAddress === undefined){
          throw new CustomError(`Unsupported Chain ID ${web3Info.chainID}`);
        }
        const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddress);
        const tokenBal = await tokenContract.methods.balanceOf(web3Info.address).call();
        const tokenBalance = web3Info.web3.utils.toBN(Number((parseFloat(tokenBal)/10**18).toFixed(0)));
        console.log("User token balance: ", tokenBalance.toString());
        setUserBalance(tokenBalance);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    (async() => {
      await getWalletBalance();
      await checkAllowance();
    })();
  }, [tokenIndex, web3Info.address, web3Info.chainID]);
  
  
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

  // console.log("hexToNumberString: ", web3Info.web3.utils.hexToAscii("0x730396c00659059bf9a525eac839b4cbdc9f030cacee762405f7c4a077d3646b"));
  
  console.log("web3Info.connected", web3Info.connected);
  console.log("web3Info.chainID", web3Info.chainID);
  console.log("typeof web3Info.chainID", typeof web3Info.chainID);
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
              <label htmlFor="">Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Phone number</label>
              <input type="number" placeholder="Phone" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Street</label>
              <input type="text" placeholder="Street" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Town/City</label>
              <Autocomplete list={City} placeholder={"Town/City"} />
            </div>
            <div className="input__outer">
              <label htmlFor="">State</label>
              <input type="text" placeholder="State" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Country/region</label>
              <Autocomplete list={Country} placeholder={"Country/region"} />
            </div>
            <div className="input__outer">
              <label htmlFor="">Postal code</label>
              <input type="number" placeholder="Postal code" />
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
            <button disabled={isApprovalLoading} onClick={handleApproval} className="button primary">{isApprovalLoading ? "Processing..." : "Approve Payment"}</button>
          }
        </div>
      </div>
    </Hero>
  );
}
