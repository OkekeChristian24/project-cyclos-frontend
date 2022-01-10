import React, { useState } from "react";

export default function Footer() {
  const [cookie, setCookie] = useState(true);
  return (
    <footer className="footer">
      <div className="footer__bg">
        <img src="images/footerBg.png" alt="" />
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
      <div className="auto__container">
        <div className="footer__inner">
          <div className="footer__inner-social">
            <a href="#" className="footer__inner-social-link">
              <img src="images/icons/facebook.svg" alt="" />
            </a>
            <a href="#" className="footer__inner-social-link">
              <img src="images/icons/twitter.svg" alt="" />
            </a>
            <a href="#" className="footer__inner-social-link">
              <img src="images/icons/dribbble.svg" alt="" />
            </a>
          </div>
          <div className="footer__inner-info">
            <div className="footer__inner-info-location">
              <div className="footer__inner-info-location-row">
                <img src="images/icons/location.svg" alt="" />
                San Francisco
              </div>
              <div className="footer__inner-info-location-row">
                <img src="images/icons/message.svg" alt="" />
                English
              </div>
            </div>
            <div
              className={"footer__inner-info-cookie " + (!cookie ? "close" : "")}
            >
              By using this site you agree to our <a href="#">Cookie Policy</a>
              <span
                onClick={() => {
                  setCookie(false);
                }}
              >
                <img src="images/icons/close.svg" alt="" />
              </span>
            </div>
            <div className="footer__inner-info-copy">© Copyright 2021</div>
          </div>
          <div className="footer__inner-general">
            <div className="footer__inner-general-row">
              <img src="images/icons/map-alt.svg" alt="" />
              325 Manchester Road
            </div>
            <div className="footer__inner-general-row">
              <img src="images/icons/phone.svg" alt="" />
              +1-202-555-0109
            </div>
            <div className="footer__inner-general-row">
              <img src="images/icons/clock.svg" alt="" />9 - 12, Mon - Tue
            </div>
            <div className="footer__inner-general-row">
              <img src="images/icons/envelope.svg" alt="" />
              hellokraft8@gmail.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
