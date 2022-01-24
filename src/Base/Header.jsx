import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { GlobalContext } from "../Context/GlobalContext";
import { formatWallet } from "../Helpers/helperFunctions";
import NetOptions from "../Components/NetOptions";
import netSwitchOrAdd from "../Helpers/netSwitchOrAdd";
import detectEthereumProvider from "@metamask/detect-provider";
const chainIDs = ["Fantom Opera", "Binance Smart Chain"];

export default function Header() {

  // From GlobalContext
  const { supportedNet, web3Installed, web3Info, connectWallet, disconnectWallet } = useContext(GlobalContext);

  const cart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));

  // Component local states
  const [menu, setMenu] = useState(false);
  const [showNetOptions, setShowNetOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState(chainIDs[0]);
  const [metaMaskProvider, setMetaMaskProvider] = useState({});



  var links = document.querySelectorAll(".nav__inner-link");


  // Wallet Click handlers
  const connectWalletHandler = async() => {
    if(!web3Installed){
      (() => toast.error("Web3 Wallet Not Found!"))();
      return;
    }
    
    try {
      await connectWallet();
      (() => toast.success("Wallet Connected"))();
    } catch (error) {
      if(error.isMetaMask){
        // Show network connect options
        // (() => toast.error("This is MetaMask"))();
        if(!showNetOptions){
          setShowNetOptions(true);
        }
      }else{
        (() => toast.error(error.message))();
      }
    }
  };

  const disconnectWalletHandler = () => {
    disconnectWallet();
  };

  const handleNetShowClose = async(value) => {
    setShowNetOptions(false);
    setSelectedValue(value);
    const response = await netSwitchOrAdd(metaMaskProvider, value);
    if(response.success){
      // await connectWalletHandler();
      await connectWallet(response.chainID);
      // (() => toast.success(response.message))();
    }else if(response.success === false){
      (() => toast.error(response.message))();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const start = 300;
  const onScroll = () => {
    if (window.scrollY > start) {
      document.getElementById("header").classList.add("sticky");
    } else {
      if(document.getElementById("header") !== undefined){
        document.getElementById("header").classList.remove("sticky");
      }
    }
  };

  const menuClose = React.useCallback((e) => {
    const target = e.target;
    if (target === document.querySelector(".nav")) {
      document.body.classList.remove("active");
      document.body.removeEventListener("click", menuClose);
      setMenu(false);
    }
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.addEventListener("click", menuClose);
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
      document.body.removeEventListener("click", menuClose);
    }
  }, [menu]);

  useEffect(() => {
    (async() => {
      const MetaMProvider = await detectEthereumProvider();
      setMetaMaskProvider(MetaMProvider);
    })();
  }, []);

  const tOptions = {
    error: {
      style: {
        background: '#ff1a1a',
        color: '#ffffff',
        paddingRight: '30px',
        paddingLeft: '30px',
        fontWeight: '500',
        fontSize: '18px'
      }
    },
    success: {
      style: {
        background: '#059862',
        color: '#ffffff',
        paddingRight: '30px',
        paddingLeft: '30px',
        fontWeight: '500',
        fontSize: '18px'
      }
    }
  };

  return (
    <header className="header" id="header">
      <div className="auto__container">
        <div className="header__inner">
          <div className="header__inner-logo">
            <img src="images/logo.png" alt="logo" />
          </div>
          <nav className={"nav " + (menu ? "active" : "")} id="menu">
            <div className="nav__inner">
              <a href="" className="nav__inner-link">
              <Link to="/"> Home</Link>
              </a>
              <a href="#" className="nav__inner-link">
              
                <Link to="/shop">   Shop</Link>
              </a>
              <a href="#" className="nav__inner-link">
                
                <Link to="/cart"> Cart</Link>
              </a>
              <a href="#" className="nav__inner-link">
              
               <Link to="/bill"> Bill</Link>
              </a>

              <a href="#" className="nav__inner-link">
                Foundation
              </a>
              <button onClick={!web3Info.connected ? connectWalletHandler : undefined} className="button connect">
                <img src="images/icons/wallet.svg" alt="wallet" />
                {web3Info.connected ? formatWallet(web3Info.address) : "Connect Wallet"}
              </button>
            </div>
          </nav>
          <div
            className={"burger " + (menu ? "active" : "")}
            id="menuBtn"
            onClick={() => {
              setMenu(!menu);
            }}
          ></div>
        </div>
      </div>
      {
        showNetOptions
        &&
        <NetOptions 
          open={showNetOptions}
          selectedValue={selectedValue}
          onClose={handleNetShowClose}
        />
      }
      <Toaster toastOptions={tOptions} />
    </header>
  );
}
