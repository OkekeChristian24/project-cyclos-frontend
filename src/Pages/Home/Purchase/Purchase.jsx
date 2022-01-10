import React from "react";

export default function Purchase() {
  return (
    <section className="purchase">
      <div className="purchase__shape">
        <img src="images/index/shapes.png" alt="shapes" />
      </div>
      <div className="auto__container">
        <div className="purchase__inner">
          <div className="purchase__inner-cards">
            <div className="purchase__inner-card">
              <div className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="bell" />
              </div>
              <h5>Phone</h5>
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
                There many variations passages of Lorem Ipsum majority some by
                words which don't look .
              </p>
            </div>
            <div className="purchase__inner-card">
              <div className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Games</h5>
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
                There many variations passages of Lorem Ipsum majority some by
                words which don't look .
              </p>
            </div>
            <div className="purchase__inner-card">
              <div className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Sporting Goods</h5>
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
                There many variations passages of Lorem Ipsum majority some by
                words which don't look .
              </p>
            </div>
            <div className="purchase__inner-card">
              <div className="purchase__inner-card-icon">
                <img src="images/icons/bell.svg" alt="" />
              </div>
              <h5>Team Accounts</h5>
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
                There many variations passages of Lorem Ipsum majority some by
                words which don't look .
              </p>
            </div>
          </div>
          <div className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2>Purchase Things</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <a href="#" className="button primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
