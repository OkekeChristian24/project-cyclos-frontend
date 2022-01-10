import React from "react";

export default function Hero(props) {
  return (
    <div className="hero">
      <div className="hero__bg">
        <img src="images/index/intro.png" alt="" />
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
      <div className="auto__container">
        <div className="hero__inner">{props.children}</div>
      </div>
    </div>
  );
}
