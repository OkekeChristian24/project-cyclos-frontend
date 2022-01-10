import React from "react";
import ProductsItem from "./ProductsItem";
import { ProductsModul } from "./ProductsModul";

export default function Products() {
  return (
    <div className="products__outer">
      <div className="products__outer-bg">
        <img src="images/index/map.svg" alt="" />
      </div>
      <div className="products__outer-shape">
        <img src="images/index/oval.svg" alt="" />
      </div>
      <div className="auto__container">
        <div className="products__row">
          {ProductsModul.map((ProductsItems) => {
            return (
              <ProductsItem
                id={ProductsItems.id}
                image={ProductsItems.image}
                alt={ProductsItems.alt}
                name={ProductsItems.name}
                desc={ProductsItems.desc}
                discount={ProductsItems.discount}
                price={ProductsItems.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
