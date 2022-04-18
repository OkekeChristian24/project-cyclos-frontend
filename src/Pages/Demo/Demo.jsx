import React, { useContext, useState } from "react";
import "./demo.css";
import VideoDemo from "./VideoDemo";

export default function Demo({props}){

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
      <div className="auto__container">
        <h3 className="demo_title">How it works</h3>
        <div className="auto__container demo_video-container">
          <VideoDemo videoID={"37WBB7CdKfo"} videoTitle={"How to search for an item on CYCLOS"} />
          <VideoDemo videoID={"nWlThD4v7_Y"} videoTitle={"How to view paid items"} />
        </div>
        <div className="auto__container demo_video-container">
          <VideoDemo videoID={"MUpau1INPzQ"} videoTitle={"How to add item to cart and check out from cart"} />
          <VideoDemo videoID={"wpN91zb6a4c"} videoTitle={"What you need to know about shipping"} />
        </div>
        {/* <div>
        </div> */}
      </div>
    </div>
  );
}