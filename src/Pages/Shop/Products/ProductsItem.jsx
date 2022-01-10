import React from "react";

export default function ProductsItem(props) {
  return (
    <div className="products" key={props.id}>
      <div className="products__header">
        <img src={props.image} alt={props.alt} />
      </div>
      <div className="products__body">
        <h5>{props.name}</h5>
        <hr />
        <p>{props.desc}</p>
      </div>
      <div className="products__footer">
        <div className="discount">Discount: {props.discount}</div>
        <div className="price">${props.price}</div>
        <div className="products__footer-submit">
          <a href="" className="button add">
            <img src="images/icons/search.png" alt="" />
            Search
          </a>
          <a href="" className="button add">
            <img src="images/icons/cart.png" alt="" />
            Cart
          </a>
        </div>
      </div>
    </div>
  );
}
