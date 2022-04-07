import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalContext";
import genRandomness from "../../../Helpers/genRandomness";

export default function CartLineItem(props) {


  // global states
  const { updateItem, removeItem, duplicateItem } = useContext(GlobalContext);

  // Local states
  const [itemQty, setItemQty] = useState(props.quantity);
  const [color, setColor] = useState(props.color);
  const [size, setSize] = useState(props.size);
  const [needUpdate, setNeedUpdate] = useState(false);

  const handleQtyChange = (event) => {
    if(isNaN(event.target.value)){
      return;
    }
    
    setItemQty(Number(event.target.value));
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      link: props.link,
      quantity: Number(event.target.value)
    };
    updateItem(cartProduct);
    
    // setNeedUpdate(true);
  };
  
  // Handle color change
  const handleColorChange = (event) => {
    
    setColor(String(event.target.value));
    
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      color: String(event.target.value),
      size: props.size,
      link: props.link,
      quantity: props.quantity
    };
    
    updateItem(cartProduct);
  };

  const handleItemDelete = () => {
    removeItem(props.id);
  };

  // Handle size change
  const handleSizeChange = (event) => {
    setSize(String(event.target.value));
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      color: props.color,
      size: String(event.target.value),
      link: props.link,
      quantity: props.quantity
    };
    updateItem(cartProduct);
    
  };
  
  // const handleItemUpdate = () => {
  //   if(typeof itemQty !== "number" &&  typeof size !== "number" &&  typeof color !== "string" ){
  //     return;
  //   }
  //   if(itemQty <= 0){
  //     removeItem(props.id);
  //     return;
  //   }
  //   const cartProduct = {
  //     id: props.id,
  //     asin: props.asin,
  //     title: props.title,
  //     price: props.price,
  //     image: props.image,
  //     link: props.link,
  //     quantity: itemQty
  //   };
  //   updateItem(cartProduct);
  //   setNeedUpdate(false);
  // };

  const increaseQty = () => {
    setItemQty(itemQty => itemQty + 1);

    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      color: props.color,
      size: props.size,
      link: props.link,
      quantity: Number(props.quantity + 1)
    };
    // setItemQty(itemQty => itemQty + 1);
    updateItem(cartProduct);

  };

  const decreaseQty = () => {
    if(props.quantity === 1){
      return;
    }
    setItemQty(itemQty => itemQty - 1);
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      color: props.color,
      size: props.size,
      link: props.link,
      quantity: Number(props.quantity - 1)
    };
    updateItem(cartProduct);
  };

  const handleDuplicate = () => {
    const newID = genRandomness();
    duplicateItem(props.id, newID);
  }

  
  return (
    <div className="cartLine">
      <div className="cartLine__delete">
        <img onClick={handleItemDelete} src="images/icons/closeRed.svg" alt="delete" />
      </div>
      <div className="cart__table-row">
        <div className="cart__table-col">
          <span className="mobileTitle">Product</span>
          <div className="cartLine__image">
            <img src={props.image} alt="product" />
          </div>
          <div className="cartLine__desc">{props.title}</div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Price</span>

          <div className="cartLine__price">${Number(props.price).toFixed(3)}</div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Quantity</span>

          <div className="cartLine__quantity">
            <button className="decBtn" onClick={decreaseQty}>-</button>
            <input type="text" onChange={handleQtyChange} value={itemQty} />
            <button className="incBtn" onClick={increaseQty}>+</button>
          </div>
        </div>


        <div className="cart__table-col">
          <span className="mobileTitle">Color</span>
          <div className="cartLine__quantity">
            <input type="text" onChange={handleColorChange} value={color} />
          </div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Size</span>
          <div className="cartLine__quantity">
            <input type="text" onChange={handleSizeChange} value={size} />
          </div>
        </div>
        <div className="cart__table-col">
          <span className="mobileTitle">Subtotal</span>
          <div className="cartLine__price">${Number(props.subtotal).toFixed(3)}</div>
        </div>

 
     <div style={{flexDirection:"row", justifyContent: "center", alignContent: "center"}}className="cart__table-col">
          <button onClick={handleDuplicate} className="button add">Duplicate</button>
      </div>
 
      </div>
      {/* <div style={{width: "100%", flexDirection:"row", justifyContent: "flex-end", alignContent: "center"}}className="cart__table-col">
        <button onClick={handleDuplicate} style={{marginTop: 20}}className="button add">Duplicate</button>
      </div> */}
    </div>
  );
}
