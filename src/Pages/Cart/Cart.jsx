import React from "react";
import Hero from "../../Base/Hero";
import CartLineItem from "./CartLine/CartLineItem";
import { CartLineModul } from "./CartLine/CartLineModul";

export default function Cart() {
  return (
    <>
      <Hero>
        <div className="cart">
          <div className="cart__table">
            <div className="cart__table-header">
              <div className="cart__table-row">
                <div className="cart__table-col">
                  <div className="cart__table-col-title">Product</div>
                </div>
                <div className="cart__table-col">
                  <div className="cart__table-col-title">Price</div>
                </div>

                <div className="cart__table-col">
                  <div className="cart__table-col-title">Quantity</div>
                </div>
                <div className="cart__table-col">
                  <div className="cart__table-col-title">Subtotal</div>
                </div>
              </div>
            </div>
            <div className="cart__table-body">
              {CartLineModul.map((CartLineItems) => {
                return (
                  <CartLineItem
                    id={CartLineItems.id}
                    image={CartLineItems.image}
                    alt={CartLineItems.alt}
                    value={CartLineItems.value}
                    desc={CartLineItems.desc}
                    price={CartLineItems.price}
                    subtotal={CartLineItems.subtotal}
                  />
                );
              })}
            </div>
            <div className="cart__table-footer">
              <div className="cart__table-footer-row">
                <button className="button extra">Coupon c</button>
                <button className="button primary">Apply coupon</button>
              </div>
              <div className="cart__table-footer-row">
                <button className="button secondary">Update cart</button>
              </div>
            </div>
          </div>
        </div>
      </Hero>
      <div className="total__outer">
        <div className="auto__container">
          <div className="total">
            <div className="total__inner">
              <h2>Cart totals</h2>
              <div className="total__inner-row">
                <h4>Subtotal</h4>
                <span>$199.99</span>
              </div>
              <div className="total__inner-row">
                <h4>Shipping</h4>
                <span>Free shipping Shipping to FL.</span>
              </div>
              <div className="total__inner-row">
                <h4>Total</h4>
                <span>$199.99</span>
              </div>
              <div className="total__inner-submit">
                <button className="button primary">Proceed to checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
