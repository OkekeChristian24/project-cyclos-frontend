import React from "react";
import Slider from "react-slick";
function Prev(props) {
  const { onClick } = props;
  return (
    <button type="button" className="prev" onClick={onClick}>
      <img src="images/icons/chevron-left.svg" alt="" />
    </button>
  );
}
function Next(props) {
  const { onClick } = props;
  return (
    <button type="button" className="next" onClick={onClick}>
      <img src="images/icons/chevron-right.svg" alt="" />
    </button>
  );
}
export default function ReviewsSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider__outer">
      <div className="slider">
        <Slider {...settings}>
          <div className="slider__item">
            <div className="slider__item-icon">
              <img src="images/icons/revIcon.svg" alt="" />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum form, by
              injected humour randomised words which slightly believable.
            </p>
            <div className="slider__item-info">
              <div className="slider__item-info-avatar">
                <img src="images/index/ava.png" alt="" />
              </div>
              <div className="slider__item-info-text">
                <h5>Adalberto Kovach</h5>
                <p>Marketing Management</p>
              </div>
            </div>
          </div>
          <div className="slider__item">
            <div className="slider__item-icon">
              <img src="images/icons/revIcon.svg" alt="" />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum form, by
              injected humour randomised words which slightly believable.
            </p>
            <div className="slider__item-info">
              <div className="slider__item-info-avatar">
                <img src="images/index/ava.png" alt="" />
              </div>
              <div className="slider__item-info-text">
                <h5>Adalberto Kovach</h5>
                <p>Marketing Management</p>
              </div>
            </div>
          </div>
          <div className="slider__item">
            <div className="slider__item-icon">
              <img src="images/icons/revIcon.svg" alt="" />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum form, by
              injected humour randomised words which slightly believable.
            </p>
            <div className="slider__item-info">
              <div className="slider__item-info-avatar">
                <img src="images/index/ava.png" alt="" />
              </div>
              <div className="slider__item-info-text">
                <h5>Adalberto Kovach</h5>
                <p>Marketing Management</p>
              </div>
            </div>
          </div>
          <div className="slider__item">
            <div className="slider__item-icon">
              <img src="images/icons/revIcon.svg" alt="" />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum form, by
              injected humour randomised words which slightly believable.
            </p>
            <div className="slider__item-info">
              <div className="slider__item-info-avatar">
                <img src="images/index/ava.png" alt="" />
              </div>
              <div className="slider__item-info-text">
                <h5>Adalberto Kovach</h5>
                <p>Marketing Management</p>
              </div>
            </div>
          </div>
          <div className="slider__item">
            <div className="slider__item-icon">
              <img src="images/icons/revIcon.svg" alt="" />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum form, by
              injected humour randomised words which slightly believable.
            </p>
            <div className="slider__item-info">
              <div className="slider__item-info-avatar">
                <img src="images/index/ava.png" alt="" />
              </div>
              <div className="slider__item-info-text">
                <h5>Adalberto Kovach</h5>
                <p>Marketing Management</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
