import React from "react";
import Hero from "../../Base/Hero";
import Products from "./Products/Products";

export default function Shop() {
  return (
    <>
      <Hero>
        <h1>Purchase with Crypto</h1>
        <p>
        Bringing Crypto and Retail Closer Together.
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
