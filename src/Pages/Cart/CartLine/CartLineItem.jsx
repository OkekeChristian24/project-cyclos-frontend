import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalContext";

export default function CartLineItem(props) {

  // global states
  const { updateItem, removeItem } = useContext(GlobalContext);

  // Local states
  const [itemQty, setItemQty] = useState(props.quantity);
  const [color, setColor] = useState(props.color);
  const [size, setSize] = useState(props.size);
  const [needUpdate, setNeedUpdate] = useState(false);

  const handleQtyChange = (event) => {
    if(isNaN(event.target.value)){
      setItemQty(event.target.value);
      return;
    }
    setItemQty(Number(event.target.value));
    setNeedUpdate(true);
  };
  //handle color 
  const handleColorChange = (event) => {
    if((event.target.value)){
      setColor(event.target.value);
      return;
    }
    setColor(String(event.target.value));
    setNeedUpdate(true);
  };

  const handleItemDelete = () => {
    removeItem(props.id);
  };
    //handle size
    const handleSizeChange = (event) => {
      if(isNaN(event.target.value)){
        setSize(event.target.value);
        return;
      }
      setSize(Number(event.target.value));
      setNeedUpdate(true);
    };
  
  

  
  const handleItemUpdate = () => {
    if(typeof itemQty !== "number" &&  typeof size !== "number" &&  typeof color !== "string" ){
      return;
    }
    if(itemQty <= 0){
      removeItem(props.id);
      return;
    }
    const cartProduct = {
      id: props.id,
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

  const increaseQty = () => {
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      link: props.link,
      quantity: (props.quantity + 1)
    };
    updateItem(cartProduct);

  };

  const decreaseQty = () => {
    if(props.quantity === 1){
      return;
    }
    const cartProduct = {
      id: props.id,
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      link: props.link,
      quantity: (props.quantity - 1)
    };
    updateItem(cartProduct);
  };

  // const handleColorChange = (event) => {
  //   const cartProduct = {
  //     id: props.id,
  //     asin: props.asin,
  //     title: props.title,
  //     price: props.price,
  //     image: props.image,
  //     color: event.target.value,
  //     size: props.size,
  //     link: props.link,
  //     quantity: props.quantity
  //   };
  //   updateItem(cartProduct);
  // };

  // const handleSizeChange = (event) => {
  //   const cartProduct = {
  //     id: props.id,
  //     asin: props.asin,
  //     title: props.title,
  //     price: props.price,
  //     image: props.image,
  //     color: props.color,
  //     size: event.target.value,
  //     link: props.link,
  //     quantity: props.quantity
  //   };
  //   updateItem(cartProduct);
  // };


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
          <div className="cartLine__desc">{props.title}</div>
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
          <div className="cartLine__price">${props.subtotal}</div>
        </div>

 
     <div style={{flexDirection:"row", justifyContent: "center", alignContent: "center"}}className="cart__table-col">
          <button onClick={handleItemUpdate} disabled={!needUpdate} style={updateBtn} className="">Update Cart</button>
        </div>
 
      </div>
      <div style={{width: "100%", flexDirection:"row", justifyContent: "flex-end", alignContent: "center"}}className="cart__table-col">
          <button onClick={handleItemUpdate} disabled={!needUpdate} style={{marginTop: 20}}className="button add">Duplicate</button>
  
        </div>
    </div>
  );
}
