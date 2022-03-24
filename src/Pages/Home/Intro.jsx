import React from "react";
import { Link } from "react-router-dom";
import "./intro.css"
export default function Intro() {
  return (
    <section className="intro">
      <div className="intro__bg">
        <img src="images/header.png" alt="" />
        <div className="intro__wave">
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
      <div className="intro__shape">
        <img src="images/hero.png" alt="" />
      </div>
      <div className="auto__container">
        <div  className="intro__inner">
          <div className="intro__inner-content">
            <h1> Cross-border shopping using cryptocurrency.</h1>
            <p id ="text" className="bg">
            Bridging the crypto-retail divide.  
To make a purchase, look through our catalogue.
            </p>
            <a href="#" className="button primary">
            <Link to="/shop"> Explore</Link>
            </a>
          </div>
          <div id="cart" className="intro__inner-image">
            <img  src="images/cart2.png" alt="" />
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
