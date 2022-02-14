import React, { useContext, useEffect, useState } from "react";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import Products from "./Products/Products";

export default function Shop() {

  // Global states and functions
  const { products, searchProducts, getCart, cart } = useContext(GlobalContext);

  // Local states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const submitSearch = async(e) => {
    e.preventDefault();
    setIsSearching(true);
    await searchProducts(searchTerm);
    setIsSearching(false);
  };

  const handleClick = () => {
    setIsSearching(true);
  };

  const handleTextChange = (event) => {
      setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   console.log("In Shop component, Products: ", products);
  // }, [products]);

  
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Hero>
        <h1>Purchase with Crypto</h1>
        <p>
        Bringing Crypto and Retail Closer Together.
        </p>
        <form onSubmit={submitSearch} className="search">
          <input type="text" value={searchTerm} onChange={handleTextChange} placeholder="Enter keyword or Amazon ASIN" />
          <button onClick={handleClick} className="button primary" type="submit">
            {isSearching ? "Loading..." : "Search"}
          </button>
        </form>
      </Hero>
      {
        // products.length
        true
        &&
        <Products products={products} />
      }
    </>
  );
}
