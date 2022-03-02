import React from "react";

export default function Purchase() {
  return (
    <section className="purchase">
      <div className="purchase__shape">
        <img src="images/purchase.png" alt="shapes" />
      </div>
      <div className="auto__container">
        <div className="purchase__inner">
          <div className="purchase__inner-cards">
            <div className="purchase__inner-card">
              <div style={{background:"#D3D3D3"}} className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="bell" />
              </div>
              <h5>IOS/Android Phone</h5>
              <div className="purchase__inner-card-rate">
                <div className="star">
                  <div className="star__empty">
                    <img src="images/icons/starEmpty.svg" alt="starEmpty" />
                  </div>
                  <div className="star__full" style={{ width: "84%" }}>
                    <span>
                      <img src="images/icons/starFull.svg" alt="starFull" />
                    </span>
                  </div>
                </div>
                <div className="num">4.2</div>
              </div>

              <p className="sm">
              Craving for a device with  newest technology that enables wireless charging, clear, detailed, high resolution images; thin, sleek and of lightweight, and uninteruppted 5G connectivity?
<strong>Check out the new iPhone SE 2022 smartphone - $500,000</strong>
              </p>
            </div>
            <div className="purchase__inner-card">
              <div style={{background:"#D3D3D3"}} className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Sports Car (Gadgets)</h5>
              <div className="purchase__inner-card-rate">
                <div className="star">
                  <div className="star__empty">
                    <img src="images/icons/starEmpty.svg" alt="" />
                  </div>
                  <div className="star__full" style={{ width: "90%" }}>
                    <span>
                      <img src="images/icons/starFull.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="num">4.7</div>
              </div>

              <p className="sm">
              Going for that city tour, looking for a machine produced with greater acceleration, top speed, lighter, quicker, more agile and of good investment?
<strong>Try the Lamborghini 2021 series - $3,300,000</strong>
              </p>
            </div>
            <div className="purchase__inner-card">
              <div style={{background:"#D3D3D3"}} className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Luxury Wristwatch</h5>
              <div className="purchase__inner-card-rate">
                <div className="star">
                  <div className="star__empty">
                    <img src="images/icons/starEmpty.svg" alt="" />
                  </div>
                  <div className="star__full" style={{ width: "100%" }}>
                    <span>
                      <img src="images/icons/starFull.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="num">5</div>
              </div>

              <p className="sm">
              In search of a timepiece, built-to-last, exudes class, coupled with innovative technology, ensures longevity and can be passed down to generations. 
<strong>Try the Graff Diamonds, the Fascination Watch – $40 Million
Don’t sleep on it. Add to Cart now.</strong>
              </p>
            </div>
            <div style={{background:"#FFE2DC"}} className="purchase__inner-card">
              <div style={{background:"#212121"}} className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Luxury Jewelry</h5>
              <div className="purchase__inner-card-rate">
                <div className="star">
                  <div className="star__empty">
                    <img src="images/icons/starEmpty.svg" alt="" />
                  </div>
                  <div className="star__full" style={{ width: "90%" }}>
                    <span>
                      <img src="images/icons/starFull.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="num">4.7</div>
              </div>

              <p className="sm">
              Thinking of the best way to express your feelings to a her?  She would say YES, to a high value, crystal-clear gem stone, made with the purest materials of precious metals.
<strong>Try The Apollo Blue diamond earrings - $42,000,000</strong>
              </p>
            </div>
          </div>
          <div className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2> Procure with Crypto</h2>
          
            <p>
            Add goods to your shopping cart. Remember to take advantage of the discount!
            </p>
            <a href="#" className="button primary">
             Place Order
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
