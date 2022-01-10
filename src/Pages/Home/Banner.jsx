import React from "react";
import YouTube from "react-youtube";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner__shape">
        <img src="images/index/bannerShape.png" alt="bannerShape" />
      </div>
      <div className="banner__bg">
        <img src="images/index/banner.png" alt="banner" />
        <div className="banner__wave">
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
      <div className="auto__container">
        <div className="banner__inner">
          <div className="banner__inner-video-outer">
            <YouTube
              videoId={"i9F9_pzVG7w"} // defaults -> null
              className={"banner__inner-video"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
