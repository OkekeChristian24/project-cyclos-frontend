import React from "react";
import UniqueSlider from "./uniqueslide";

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews__shape">
        <img src="images/index/oval.svg" alt="" />
      </div>
      <div className="auto__container">
        <div className="reviews__inner">
          <h2 style={{marginBottom:-100}}>What makes us unique</h2>
          <div className="slider__outer">
            <UniqueSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
