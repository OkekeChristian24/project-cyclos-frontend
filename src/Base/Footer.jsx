import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css"
export default function Footer() {
  const [cookie, setCookie] = useState(true);
  return (
    <footer id="footer" className="footer" style={{background:'#FD6E4F'}} >
      <div className="footer__bg">
      <img src="images/footer2.svg" alt="" />
      </div>
      <div className="footer__wave">
        <svg width="2880" height="100%" viewBox="0 0 2880 360" fill="none">
          <path
            id="Wave"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2880 0H0V360C480 250.286 960 195.429 1440 195.429C1920 195.429 2400 250.286 2880 360V0Z"
            fill=""
          />
        </svg>
      </div>
      <div className="auto__container"  >
        <div className="footer__inner">
     <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "60px"}}>
     <img style={{width:200}} src="images/logo/Logo white.png" alt="" />
     </div>
     {/* Links */}
<div id="links" className="links" style={{display: "flex", justifyContent: "space-between", alignItems:"center", marginBottom: "30px"}}> 
{/* column 1 */}
<div id="col1" style={{display: "flex",   justifyContent: "space-evenly", alignItems:"center"}}>
<a href="" className="nav__inner-link">
              <Link to="/" style={{color: "#fff", fontSize: '15px', fontweight:1500}}> Home</Link>
              </a>
              <a href="#" className="nav__inner-link">
              
                <Link to="/shop" style={{color: "#fff", fontSize: '15px', fontweight:1500}}>   Shop</Link>
              </a>
              <a href="#" className="nav__inner-link">
                
                <Link to="/cart" style={{color: "#fff", fontSize: '15px', fontweight:1500}}> Cart</Link>
              </a>
</div>
{/* column 2 */}
<div id="col2"  style={{display: "flex",  justifyContent: "space-evenly", alignItems:"center"}}>
<a href="https://www.privacypolicies.com/live/437da669-cc1e-4daf-9cd9-abfc7e1e676c" style={{color: "#fff", fontSize: '15px', fontweight:1500}}  className="nav__inner-link" > Terms and condition
             
              </a>
              <a href="https://www.privacypolicies.com/live/d63cb759-2341-4bbe-bb0f-c749d3971c8a" style={{color: "#fff", fontSize: '15px', fontweight:1500}} className="nav__inner-link">
              Privacy policy

              </a>
              <a href="https://www.privacypolicies.com/live/7282793a-55c1-45ec-baed-25c51bc7c571"  style={{color: "#fff", fontSize: '15px', fontweight:1500}} className="nav__inner-link">
              Return and refund policy

              </a>
</div>
           
</div>
        
          {/* Below the line */}
          <div id="below" className="footer__inner-general">
            <div className="footer__inner-general-row">
            <div className="footer__inner-info-copy" style={{fontSize: '16px', fontweight:"bold"}}>© 2021 Cyclos. All rights reserved</div>
            </div>
            <div className="footer__inner-general-row">
            <div className="footer__inner-social">
            <a href="https://www.facebook.com/Cyclos-107825191872308" className="footer__inner-social-link"  >
              <img  src="images/icons/facebook.svg" alt=""  style={{margin:0}} />
            </a>
            <a href="https://twitter.com/CyclosShop" className="footer__inner-social-link">
              <img src="images/icons/twitter.svg" alt="" style={{margin:0}} />
            </a>
            <a href="https://www.instagram.com/cyclosmarketplace/" className="footer__inner-social-link">
              <img src="images/icons/dribbble.svg" alt="" style={{margin:0}} />
            </a>
          </div>
            </div>
        
          </div>
        </div>
      </div>
    </footer>
  );
}
