import React, { useContext, useState } from "react";
import "./howtouse.css";

export default function HowToUse(){

  return (
    <div className="hero">
      <div className="hero__bg">
        <img src="images/header.png" alt="" />
        <div className="hero__wave">
          <svg width="2880" height="100%" viewBox="0 0 2880 362" fill="none">
            <path
              id="Wave"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2922 360.208H-42V0C452 109.778 945.999 164.667 1440 164.667C1934 164.667 2428 109.778 2922 0V360.208Z"
              fill=""
            />
          </svg>
        </div>
      </div>
      <div className="hero__shape">
        <img src="images/index/shapes.png" alt="" />
      </div>
      <div className="auto__container demo_container">
        <h4 className="demo_title">How to use Cyclos</h4>
        <div className="first_thing">
          <div className="instructions-container">
            <h4 className="instructions-title">
              How To Download MetaMask (Desktop/Laptop)
            </h4>
              <div className="instruction">
                <h6 className="instruction-heading">1. To download Metamask for use on Featured, please visit <a href='https://metamask.io'>metamask.io</a>.</h6>
                <img className="instruction-img" src="images/howItWorks/demo/download-metamask.png" alt="Download MetaMask"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">2. On the next page, select [Chrome] and then click [Install MetaMask for Chrome]. If you are using a mobile device, go the google play store or IOS store to download the Metamask app.</h6>
                <img className="instruction-img" src="images/howItWorks/demo/install-metamask.png" alt="Install MetaMask"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">3. This will bring you to the Chrome Web Store where you can install the browser extension. Click [Add to Chrome].</h6>
                <img className="instruction-img" src="images/howItWorks/demo/add-to-chrome.png" alt="Add to Chrome"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">4.	Go to the puzzle piece icon at the top of your browser and click on [MetaMask] after installing it.</h6>
                <img className="instruction-img" src="images/howItWorks/demo/pin-metamask.png" alt="Pin MetaMask"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">5.	This will open the MetaMask Get Started page. Click [Get Started] to begin.</h6>
                <img className="instruction-img" src="images/howItWorks/demo/get-started.png" alt="Get started"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">6.	You will be greeted with two options. You can either log in to your MetaMask account, or create a new one. Most likely you will want to create a new one, so click [Create a Wallet].</h6>
                <img className="instruction-img" src="images/howItWorks/demo/create-wallet.png" alt="Create wallet"/>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">7.	The next page will require you to create a password.</h6>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">8.	The next page after this will give you a seed phrase. This phrase will consist of at least 12 words that must be kept safe. You CANNOT LOSE these and you also CANNOT SHARE them or you will risk losing your wallet account forever.</h6>
              </div>
              <div className="instruction">
                <h6 className="instruction-heading">9.	After you confirm with MetaMask that you have saved your seed phrase somehow, then you have created your new wallet. You will see the extension icon created on the top right corner of your web browser, there you can have access to your wallet directly without visiting the MetaMask web site.</h6>
              </div>
          </div>

          <div className="instructions-container">
            <h4 className="instructions-title">
              How To Search and Buy Item from Amazon on Cyclos
            </h4>
            <div className="instruction">
              <h6 className="instruction-heading">1. Search for item and copy URL link of searched item from the Amazon page.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/search-amazon.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">2.	Click on explore or shop to search for items.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/explore-cyclos.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">3.	Paste the copied URL link on the search column and search for item.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/paste-url.png" alt="Download MetaMask"/>
              <img className="instruction-img" src="images/howItWorks/demo/search-cyclos.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">4.	Add searched item to cart.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/add-to-cart.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">5.	Connect Metamask wallet.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/connect-wallet-1.png" alt="Download MetaMask"/>
              <img className="instruction-img" src="images/howItWorks/demo/connect-wallet-2.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">6.	Click on proceed to checkout to check out items.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/proceed-checkout.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">7.	Fill the receiver’s details, select cryptocurrency (stable coin) you are paying with and make payment.</h6>
              <img className="instruction-img" src="images/howItWorks/demo/select-token-1.png" alt="Download MetaMask"/>
              <img className="instruction-img" src="images/howItWorks/demo/select-token-2.png" alt="Download MetaMask"/>
              <img className="instruction-img" src="images/howItWorks/demo/approve-pay.png" alt="Download MetaMask"/>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">8. After approving, click "Make Payment" button to pay for the item(s)</h6>
            </div>
            <div className="instruction">
              <h6 className="instruction-heading">9.	Check dashboard to see all items paid for.</h6>
              <p className="note">
                <span className="note-bold">Note:</span> Shipment fee will be charged after Cyclos warehouse has taken delivery of the items bought. Weight, length, and width of the item will be used to determine the shipment cost. Customers will have the options of paying for shipment before the item leaves the US for Nigeria or upon arrival of the item in Nigeria.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}