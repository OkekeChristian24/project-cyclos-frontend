import React, { useEffect } from "react";
import ProductsItem from "./ProductsItem";
import { ProductsModul } from "./ProductsModul";

export default function Products({ products }) {

  useEffect(() => {
    //
  }, []);
  
  console.log("In Products component: ", products);
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
          {products.map((product) => {
            return (
              <ProductsItem
                key={product.asin}
                asin={product.asin}
                image={product.image}
                alt={product.alt}
                name={product.name}
                description={product.title}
                discount={product.discount}
                price={product.price.value}
                link={product.link}
                itemWeight={product.itemWeight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
