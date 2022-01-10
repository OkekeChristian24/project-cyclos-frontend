import React from "react";
import ReviewsSlider from "./ReviewsSlider";

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews__shape">
        <img src="images/index/oval.svg" alt="" />
      </div>
      <div className="auto__container">
        <div className="reviews__inner">
          <h2>Reviews</h2>
          <div className="slider__outer">
            <ReviewsSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
