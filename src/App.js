import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Base/Footer";
import Header from "./Base/Header";
import Bill from "./Pages/Bill/Bill";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Orders from "./Pages/Orders/Orders";
import OrderItems from "./Pages/OrderItems/OrderItems";
import Demo from "./Pages/Demo/Demo";

import { GlobalProvider } from "./Context/GlobalContext";



export default function App() {
// const setGa =() => {
//   ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE, {
//     debug: true,
//     titleCase: false,
//     gaOptions: {
//       userId: 123
//     }
//   });
//   ReactGA.pageview(window.location.pathname + window.location.search);
// }
  const initTheme =
    localStorage.getItem("lightMode") === "true"
      ? true 
      : localStorage.getItem("lightMode") === "false"
      ? false
      : true;

  const [lightMode, setLightMode] = useState(initTheme);
  useEffect(() => {
    if (lightMode) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("lightMode", true);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("lightMode", false);
    }
  }, [lightMode]);

// useEffect(() => {
// setGa()
// })
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/dashboard" element={<Orders />} />
          <Route path="/item/:index" element={<OrderItems />} />

          {/* 
          <Route path="/cards-group" element={<CardGroup></CardGroup>} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  );
}
