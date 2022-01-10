import React from "react";

export default function Pay() {
  return (
    <section className="pay">
      <div className="pay__bg">
        <img src="images/index/map.svg" alt="map" />
      </div>
      <div className="auto__container">
        <div className="pay__inner">
          <h2>Pay with</h2>
          <div className="pay__inner-row">
            <a href="#" className="button primary">
              On Fantom
            </a>
            <a href="#" className="button secondary">
              On BSC
            </a>
          </div>
          <div className="pay__inner-wallet">
            <div className="pay__inner-wallet-icon">
              <img src="images/icons/tether.svg" alt="" />
            </div>
            <h5>USDT of Fantom network</h5>
            <hr />
            <p>
              Get to know your audience, analyze the performance of your links.
            </p>
            <div className="pay__inner-wallet-center">
              <a href="#" className="button extra">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
