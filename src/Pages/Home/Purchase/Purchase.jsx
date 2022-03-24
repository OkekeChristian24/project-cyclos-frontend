import React from "react";
import { Link } from "react-router-dom";


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
              <Link to="/shop?search_term=macbooks">
              {/* <div style={{background:"#D3D3D3"}} className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="bell" />
              </div> */}
              <h5>Laptops and Tablets </h5>

              {/* <div className="purchase__inner-card-rate">
                <div className="star">
                  <div className="star__empty">
                    <img src="images/icons/starEmpty.svg" alt="starEmpty" />
                  </div>
                  <div className="star__full" style={{ width: "84%" }}>
                    <span>
                      <img src="images/icons/starFull.svg" alt="starFull" />
                    </span>
                  </div>
                  <div className="num">4.2</div>
                </div>
                <div className="num">4.2</div>
              </div> */}
              {/* 
              <p className="sm">
              Craving for a device with  newest technology that enables wireless charging, clear, detailed, high resolution images; thin, sleek and of lightweight, and uninteruppted 5G connectivity?
<strong>Check out the new iPhone SE 2022 smartphone - $500,000</strong>
              </p> */}
              <img
                style={{ width: "100%" }}
                src="images/icons/laptop.jpg"
                alt="bell"
              />
              </Link>

            </div>

            <div className="purchase__inner-card">
              <Link to="/shop?search_term=female clothings">
              <h5>Women’s Fashion</h5>

              <img
                style={{ width: "100%" }}
                src="images/icons/fashion.jpg"
                alt="bell"
              />
              </Link>
            </div>

            <div className="purchase__inner-card">
            <Link to="/shop?search_term=makeup kits">

              <h5>Beauty picks</h5>

              <img
                style={{ width: "100%" }}
                src="images/icons/beauty.jpg"
                alt="bell"
              />
              </Link>
            </div>

            <div className="purchase__inner-card">
            <Link to="/shop?search_term=baby products">

              <h5>Babycare</h5>

              <img
                style={{ width: "100%" }}
                src="images/icons/baby.jpg"
                alt="bell"
              />
              </Link>
            </div>
          </div>
          <div className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2> Pay with stablecoins</h2>

            <p>
            Add items to your shopping cart. You can pay using the Binance smart chain and Fantom Opera.
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
