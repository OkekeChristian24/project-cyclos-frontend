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
          {/* step 1 */}
          <div  className="slider__item">
        
            <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img width={100} src="images/howItWorks/search.png" alt="" />
            </div>
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Search</h4>
                <p style={{marginTop:20}} >
            Browse our catalogue to select products for purchase.
            </p>
              </div>
          </div>
   {/* step 2 */}
   <div  className="slider__item">
        
            <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img style={{margin:"0 auto"}} width={100} src="images/howItWorks/cart.png" alt="" />
            </div>
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Put in Cart</h4>
                <p style={{marginTop:20}} >
                Add items to your cart. Don't forget the discounts!
            </p>
              </div>
          </div>
             {/* step 3*/}
   <div  className="slider__item">
            <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <img  width={100} src="images/howItWorks/checkout.png" alt="" />
            </div>
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Check out</h4>
                <p style={{marginTop:20}} >
            Fill up your carts and enjoy more discounts. Let's go...
            </p>
              </div>
          </div>

   {/* step 4 */}
   <div  className="slider__item">

            <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img style={{margin:"0 auto"}} width={100} src="images/howItWorks/payment.png"alt="" />
            </div>
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Make Payment</h4>
                <p style={{marginTop:20}} >
           Fonalise payment and get your order delivered to you in no time
            </p>
              </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

{/* <div className="slider__item">
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
</div> */}