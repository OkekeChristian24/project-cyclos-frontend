import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
// import Select from "react-select";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import { supportedTokens } from "../../Helpers/addresses";
import tokenABI from "../../Helpers/tokenABI";
import Autocomplete from "./Autocomplete";
import { City } from "./Autocomplete/City";
import { Country } from "./Autocomplete/Country";



export default function Bill() {


  // Global state
  const { makePayment, cart, supportedNet, web3Installed, web3Info} = useContext(GlobalContext);
  
  // Local component state
  const [tokenIndex, setTokenIndex] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [email, setEmail] = useState();

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
  };

  const handlePayment = () => {
    if(web3Info.connected !== undefined && web3Info.connected){
      if(tokenIndex == null){
        (() => toast.error(`Please Select Payment Token`))();
        return;
      }
      if(cart.totalQty > userBalance){
        (() => toast.error(`Insufficient Token Balance`))();
        return;
      }
      makePayment(tokenIndex, cart, web3Info.address);
    }else{
      (() => toast.error(`Please Connect Wallet`))();
      
    }
  };

  const getWalletBalance = async() => {
    if(web3Info.connected !== undefined && web3Info.connected && tokenIndex !== null){
      console.log(supportedTokens[web3Info.chainID]);
      const tokenAddrress = supportedTokens[web3Info.chainID][tokenIndex - 1].address;
      const tokenContract = new web3Info.web3.eth.Contract(tokenABI, tokenAddrress);
      const tokenBal = await tokenContract.methods.balanceOf(web3Info.address).call();
      const tokenBalance = web3Info.web3.utils.toBN(Number((parseFloat(tokenBal)/10**18).toFixed(5)));
      setUserBalance(tokenBalance);
    }
  };

  useEffect(() => {
    (async() => {
      await getWalletBalance();
    })();
  }, [tokenIndex]);
  
  
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

  console.log("chainID: ", web3Info.chainID);
  console.log("Supported chain tokens: ", supportedTokens[web3Info.chainID]);

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

        <div style={payStyling}>

          {
          web3Info.connected !== undefined
          &&
          web3Info.connected
          &&
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
                  
                  supportedTokens[web3Info.chainID].map(
                    (token) => <MenuItem key={token.index} name={token.name} value={token.index}><h5>{token.name}</h5></MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Box>
          }
          <h5 style={balanceStyling}>{tokenIndex !== null ? "$" + userBalance : ""}</h5>
        </div>
        <div className="bill__footer">
          <button onClick={handlePayment} className="button primary">Make Payment</button>
        </div>
      </div>
    </Hero>
  );
}
