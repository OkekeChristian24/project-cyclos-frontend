import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalContext";
import genRandomness from "../../../Helpers/genRandomness";
import "../shop.css";

export default function ProductsItem(props) {
  // Global states and functions
  const { cart, removeItem, addToCart } = useContext(GlobalContext);

  const itemIndex = cart.products.findIndex(
    (product) => product.asin === props.asin
  );
  let notAdded = "";
  if (itemIndex === -1) {
    notAdded = false;
  } else {
    notAdded = true;
  }
  // Local states
  const [added, setAdded] = useState(notAdded);

  const handleAdd = () => {
    if (added) {
      removeItem(props.asin);
      setAdded(false);
      return;
    }
    const cartProduct = {
      id: genRandomness(),
      asin: props.asin,
      title: props.title,
      price: props.price,
      image: props.image,
      link: props.link,
      quantity: 1,
      color: "",
      size: "",
    };

    if (addToCart(cartProduct)) {
      setAdded(true);
    }
  };

  return (
    <div className="products" key={props.asin}>
      <div className="products__header">
        <img
          style={{ borderRadius: "12px" }}
          src={props.image}
          alt={props.alt}
        />
      </div>
      <div className="products__body">
        {/* <h5>{props.name}</h5> */}
        <hr />
        <p>{props.title}</p>
      </div>
      <div className="products__footer">
        {/* <div className="discount">{props.discount == null ? "" : `Discount: ${props.discount}`}</div> */}
        {props.discount == null ? (
          ""
        ) : (
          <div className="discount">{`Discount: ${props.discount}`}</div>
        )}
        <div className="logo_and_price">
          <img
            className="domain_logo"
            src={`images/companies/${props.domain}.svg`}
            alt="company"
          />
          <div className="price">${props.price}</div>
        </div>
        <div className="products__footer-submit">
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer noopener"
            className="button add"
          >
            <img src="images/icons/search.png" alt="" />
            View
          </a>
          {/* <span style={popup}>Already In Cart</span> */}
          <button onClick={handleAdd} className="button add">
            {added ? (
              // <span style={{color: "green"}}>Added</span>
              <img src="images/icons/greentick-1.svg" alt="check" />
            ) : (
              <>
                <img src="images/icons/cart.png" alt="cart" />
                Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
