import React from "react";

export default function CartLineItem(props) {
  return (
    <div className="cartLine">
      <div className="cartLine__delete">
        <img src="images/icons/closeRed.svg" alt="delete" />
      </div>
      <div className="cart__table-row">
        <div className="cart__table-col">
          <span className="mobileTitle">Product</span>
          <div className="cartLine__image">
            <img src={props.image} alt={props.alt} />
          </div>
          <div className="cartLine__desc">{props.desc}</div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Price</span>

          <div className="cartLine__price">${props.price}</div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Quantity</span>

          <div className="cartLine__quantity">
            <input type="number" placeholder="0" value={props.value} />
          </div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Subtotal</span>

          <div className="cartLine__price">${props.subtotal}</div>
        </div>
      </div>
    </div>
  );
}
