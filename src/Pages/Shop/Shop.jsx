import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import companies from "../../Helpers/constants/companies";
import Products from "./Products/Products";


export default function Shop() {

  // Global states and functions
  const { products, searchProducts, clearProducts, getCart } = useContext(GlobalContext);

  // Search query
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const submitSearch = async(e) => {
    e.preventDefault();
    setIsSearching(true);
    clearProducts();
    await searchProducts(searchTerm, companies[0].domain);
    setIsSearching(false);
  };

  const handleClick = () => {
    setIsSearching(true);
  };

  const handleTextChange = (event) => {
      setSearchTerm(event.target.value);
  };

  
  useEffect(() => {
    getCart();
    const searchTerm = searchParams.get("search_term");
    if(searchTerm != null){
      clearProducts();
      (async() => {
        setIsSearching(true);
        await searchProducts(searchTerm);
        setIsSearching(false);
      })();
    }
  }, []);

  console.log("In shop, products: ", products);
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
        products.length > 0
        // true
        &&
        <Products products={products} />
      }
    </>
  );
}
