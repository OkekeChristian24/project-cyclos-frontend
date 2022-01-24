import React from "react";
import ProductsItem from "./ProductsItem";
import { ProductsModul } from "./ProductsModul";

export default function Products({ products }) {

  
  
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
                asin={ProductsItems.asin}
                image={ProductsItems.image}
                alt={ProductsItems.alt}
                name={ProductsItems.name}
                description={ProductsItems.description}
                discount={ProductsItems.discount}
                price={ProductsItems.price}
                link={ProductsItems.link}
                itemWeight={ProductsItems.itemWeight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
