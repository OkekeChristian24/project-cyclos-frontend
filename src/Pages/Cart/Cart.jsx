import React, { useContext } from "react";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import CartLineItem from "./CartLine/CartLineItem";
import { CartLineModul } from "./CartLine/CartLineModul";

export default function Cart() {

  const { cart, deleteCart } = useContext(GlobalContext);
  // const cart = JSON.parse(window.localStorage.getItem(process.env.REACT_APP_CART_NAME));

  const handleCartDelete = () => {
    deleteCart();
  }
  console.log(cart);
  return (
    <>
      
      <Hero>
          
        <div className="cart">
          <div className="cart__table">
            { 
            cart && cart.products && cart.products.length > 0
            ?
            <>
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
                <div className="cart__table-col">
                  <div className="cart__table-col-title"></div>
                </div>
              </div>
            </div>
            <div className="cart__table-body">
              {cart.products.map((CartLineItems) => {
                return (
                  <CartLineItem
                    key={CartLineItems.asin}
                    id={CartLineItems.asin}
                    asin={CartLineItems.asin}
                    image={CartLineItems.image}
                    alt={CartLineItems.alt}
                    link={CartLineItems.link}
                    quantity={CartLineItems.quantity}
                    desc={CartLineItems.description}
                    price={CartLineItems.price}
                    subtotal={CartLineItems.price}
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
            </>
            :
            <div className="cart">
              <h4>No item in the cart</h4>
            </div>
            }
          </div>
        </div>
      </Hero>
      <div className="total__outer">
        <div className="auto__container">
          {
            cart && cart.products && cart.products.length > 0
            ?
          <>
          <div className="total">
            <div className="total__inner">
              <h2>Cart totals</h2>
              <div className="total__inner-row">
                <h4>Total Quantity</h4>
                <span>{cart.totalQty}</span>
              </div>
              <div className="total__inner-row">
                <h4>Subtotal</h4>
                <span>{`$${cart.totalPrice}`}</span>
              </div>
              <div className="total__inner-row">
                <h4>Shipping</h4>
                <span>Free shipping Shipping to FL.</span>
              </div>
              <div className="total__inner-row">
                <h4>Total</h4>
                <span>{`$${cart.totalPrice}`}</span>
              </div>
              <div className="total__inner-submit">
                <button className="button primary">Proceed to checkout</button>
              </div>
            </div>
          </div>
          </>
          :
          <h4>No item in the cart</h4>
          }
        {/*  */}
        </div>
      </div>
      
      
    </>
  );
}
