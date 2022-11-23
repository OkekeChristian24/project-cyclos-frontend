import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import companies from "../../Helpers/constants/companies";
import isValidUrl from "../../Helpers/isValidUrl";
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
    const AsinREGEX = new RegExp('\/[dg]p\/([^\/]+)');
    
    // if(searchTerm === ""){
    //   return;
    // }

    e.preventDefault();
    try {
      setIsSearching(true);
      // clearProducts();
    
      if(isValidUrl(searchTerm)){
        const seenMatches = searchTerm.match(AsinREGEX);
        if(seenMatches !== null){
          const asin = seenMatches[1];
          if(asin.length > 10){
            await searchProducts(asin.slice(0, 10), companies[0].domain);
          }else{
            await searchProducts(asin, companies[0].domain);
          }
        }else{
          await searchProducts(searchTerm, companies[0].domain);
        }
      }else{
        await searchProducts(searchTerm, companies[0].domain);
      }
      setIsSearching(false);
    } catch (error) {
      console.log(error);
      setIsSearching(false);
    }
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
        await searchProducts(searchTerm, companies[0].domain);
        setIsSearching(false);
      })();
    }
  }, []);

  // console.log("Products: ", products);

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
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </Hero>
      {
        products.products.length > 0
        // true
        &&
        <Products domain={products.domain} products={products.products} />
      }
    </>
  );
}
