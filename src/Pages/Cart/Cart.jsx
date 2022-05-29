import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import calculate from "../../Helpers/calculate";
import companies from "../../Helpers/constants/companies";
import getFeesPercent from "../../Helpers/getFeesPercent";
import CartLineItem from "./CartLine/CartLineItem";

export default function Cart() {

  const { cart, deleteCart } = useContext(GlobalContext);

  const [chargePercent, setChargePercent] = useState(null);
  const [taxPercent, setTaxPercent] = useState(null);

  const handleCartDelete = () => {
    deleteCart();
  }

  useEffect(() => {
    (async() => {
      const fees = await getFeesPercent(companies[0].name);
      if(fees !== null){
        setChargePercent(fees.charge);
        setTaxPercent(fees.tax);
      }
    })();
  }, []);



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
                <div  className="cart__table-col">
                  <div className="cart__table-col-title">Color</div>
                </div>
                <div className="cart__table-col">
                  <div className="cart__table-col-title">Size</div>
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
                    key={CartLineItems.id}
                    id={CartLineItems.id}
                    asin={CartLineItems.asin}
                    image={CartLineItems.image}
                    link={CartLineItems.link}
                    quantity={CartLineItems.quantity}
                    title={CartLineItems.title}
                    color={CartLineItems.color}
                    size={CartLineItems.size}
                    price={CartLineItems.price}
                    subtotal={Number(CartLineItems.price) * Number(CartLineItems.quantity)}
                  />
                );
              })}
            </div>
            <div className="cart__table-footer">
              {/* <div className="cart__table-footer-row">
                <button className="button extra">Coupon </button>
                <button className="button primary">Apply coupon</button>
              </div> */}
              <div className="cart__table-footer-row">
                <button onClick={handleCartDelete} className="button secondary">Clear cart</button>
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
                <span>{`$${Number(cart.totalPrice).toFixed(3)}`}</span>
              </div>
              <div className="total__inner-row">
                <h4>Charge</h4>
                <span>{chargePercent == null ? "0%" : `${chargePercent}%`}</span>
              </div>
              <div className="total__inner-row">
                <h4>Tax</h4>
                <span>{ taxPercent == null ? "0%" : `${taxPercent}%`}</span>
              </div>
              <div className="total__inner-row">
                <h4>Total</h4>
                {/* <span>{`$${calculate(chargePercent, taxPercent, cart.totalPrice)}`}</span> */}
                <span>{`$${Number(calculate(chargePercent, taxPercent, cart.totalPrice)).toFixed(4)}`}</span>
              </div>
              <div className="total__inner-submit">
                  <Link className="button primary" style={{textAlign: 'center'}} to="/bill">
                    Proceed to checkout
                  </Link>
                {/* <button className="button primary">
                </button> */}
              </div>
            </div>
          </div>
          </>
          :
          <h4>{""}</h4>
          }
        {/*  */}
        </div>
      </div>
    </>
  );
}
