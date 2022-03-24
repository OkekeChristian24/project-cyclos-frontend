import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalContext";

export default function CartLineItem(props) {

  // global states
  const { cart, updateCart, updateItem, removeItem } = useContext(GlobalContext);

  // Local states
  const [itemQty, setItemQty] = useState(props.quantity);
  const [needUpdate, setNeedUpdate] = useState(false);

  const handleQtyChange = (event) => {
    if(isNaN(event.target.value)){
      setItemQty(event.target.value);
      return;
    }
    setItemQty(Number(event.target.value));
    setNeedUpdate(true);
  };

  const handleItemDelete = () => {
    removeItem(props.asin);
  };

  // const handleQtyChange = (event) => {
  //   console.log("typeof event value: ", typeof event.target.value);
  //   console.log("event value is a number: ", isNaN(event.target.value));
  //   console.log("cart: ", cart);
  //   if(isNaN(event.target.value)){
  //     setItemQty(event.target.value);
  //     return;
  //   }
  //   const numValue = Number(event.target.value);
  //   if( numValue < 1){
  //     setItemQty(numValue);
  //     return;
  //   }

  //   const cartProduct = {
  //     asin: props.asin,
  //     title: props.title,
  //     price: props.price,
  //     image: props.image,
  //     link: props.link,
  //     quantity: Number(event.target.value)
  //   };
  // 
  //   updateItem(cartProduct);
  // };

  const handleItemUpdate = () => {
    if(typeof itemQty !== "number"){
      return;
    }
    if(itemQty <= 0){
      removeItem(props.asin);
      return;
    }
    const cartProduct = {
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      link: props.link,
      quantity: itemQty
    };
    updateItem(cartProduct);
    setNeedUpdate(false);
  };


  const updateBtn = {
    margin: "6px",
    padding: "4px",
    color: needUpdate ? "green" : "grey",
    border: "2px solid black",
    borderRadius: "12px"
  };

  return (
    <div className="cartLine">
      <div className="cartLine__delete">
        <img onClick={handleItemDelete} src="images/icons/closeRed.svg" alt="delete" />
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
            <input type="text" onChange={handleQtyChange} value={itemQty} />
          </div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Subtotal</span>
          <div className="cartLine__price">${props.subtotal}</div>
        </div>
        <div className="cart__table-col">
          <button onClick={handleItemUpdate} disabled={!needUpdate} style={updateBtn} className="">Update Cart</button>
        </div>
      </div>
    </div>
  );
}
