import React, { useContext, useState } from "react";
import "./buycoin.css";

export default function BuyCoin({props}){


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
      <div className="auto__container buycoin_container">
        <h3 className="demo_title">Fund Your Wallet</h3>
        <div className="first_thing">
          <p className="buy_text">
            Are you thinking of how to shop on Cyclos using Naira?

            Bother no more.

            Exchange Naira for BUSD/USDT/USDC on our Peer-To-Peer groups using the links below
          </p>
          <div className="p2p_links_container">
              <a target="_blank" rel="noreferrer noopener" href="https://chat.whatsapp.com/JreWqvxUBBG0Tm9j41bjuN"> P2P on WhatsApp <img width={15} src="images/external-link.svg" alt="link"/> </a>
              <a target="_blank" rel="noreferrer noopener" href="https://t.me/+yEl3cGTlmnozMjZk"> P2P on Telegram <img width={15} src="images/external-link.svg" alt="link"/> </a>
          </div>
         
        </div>
        
      </div>
    </div>
  );
}