import React from "react";
import Hero from "../../Base/Hero";
import Products from "./Products/Products";

export default function Shop() {
  return (
    <>
      <Hero>
        <h1>Shop with Crypto</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="search">
          <input type="text" placeholder="Enter category or store name" />
          <button className="button primary" type="submit">
            Search
          </button>
        </form>
      </Hero>
      <Products />
    </>
  );
}
