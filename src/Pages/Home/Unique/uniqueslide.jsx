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
        
            {/* <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img width={100} src="images/howItWorks/search.png" alt="" />
            </div> */}
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Secured</h4>
                <p style={{marginTop:20}} >
                One of the most significant problems facing the e-commerce industry is the threat to consumer data. With the use of Blockchain technology, this threat is eliminated, ensuring the security of your data.
            </p>
              </div>
          </div>
   {/* step 2 */}
   <div  className="slider__item">
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Seamless Digital Payment</h4>
                <p style={{marginTop:20}} >
                Card payments can sometimes be a hassle, leading to delayed shipments and long calls with customer service. With Cyclos, the digital payment process becomes quick and simplified. 
            </p>
              </div>
          </div>
             {/* step 3*/}
   <div  className="slider__item">
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Affordable</h4>
                <p style={{marginTop:20}} >
                At Cyclos, we aim to expand cross-border shopping across Africa and enable our valued customers to buy what they want without risks, hassle, or prolonged delivery periods. This is why we constantly work to provide affordable services to you. 
            </p>
              </div>
          </div>

   {/* step 4 */}
   <div  className="slider__item">

            {/* <div  style={{margin:"0 auto", width:130, height:130,borderRadius:100, background:"#01062D", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img style={{margin:"0 auto"}} width={100} src="images/howItWorks/payment.png"alt="" />
            </div> */}
            <div style={{margin:"0 auto", textAlign: "center"}} className="slider__item-info-text">
                <h4 style={{marginTop:20}}>Transparency</h4>
                <p style={{marginTop:20}} >
                We keep our workings and details of the shipment process transparent, so you always have an accurate picture. Additionally, our customer service is friendly and responsive to answer your questions readily.  
            </p>
              </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

