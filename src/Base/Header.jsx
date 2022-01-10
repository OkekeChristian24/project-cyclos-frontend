import React, { useState, useEffect } from "react";
export default function Header() {
  const [menu, setMenu] = useState(false);
  var links = document.querySelectorAll(".nav__inner-link");

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);
  const start = 300;
  const onScroll = () => {
    if (window.scrollY > start) {
      document.getElementById("header").classList.add("sticky");
    } else {
      document.getElementById("header").classList.remove("sticky");
    }
  };
  const menuClose = React.useCallback((e) => {
    const target = e.target;
    if (target === document.querySelector(".nav")) {
      document.body.classList.remove("active");
      document.body.removeEventListener("click", menuClose);
      setMenu(false);
    }
  }, []);
  useEffect(() => {
    if (menu) {
      document.body.addEventListener("click", menuClose);
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
      document.body.removeEventListener("click", menuClose);
    }
  }, [menu]);
  return (
    <header className="header" id="header">
      <div className="auto__container">
        <div className="header__inner">
          <div className="header__inner-logo">
            <img src="images/logo.png" alt="logo" />
          </div>
          <nav className={"nav " + (menu ? "active" : "")} id="menu">
            <div className="nav__inner">
              <a href="#" className="nav__inner-link">
                Shop
              </a>
              <a href="#" className="nav__inner-link">
                Pricing
              </a>
              <a href="#" className="nav__inner-link">
                Tokens
              </a>
              <a href="#" className="nav__inner-link">
                NFTs
              </a>

              <a href="#" className="nav__inner-link">
                Foundation
              </a>
              <a href="#" className="button connect">
                <img src="images/icons/wallet.svg" alt="wallet" />
                Connect Wallet
              </a>
            </div>
          </nav>
          <div
            className={"burger " + (menu ? "active" : "")}
            id="menuBtn"
            onClick={() => {
              setMenu(!menu);
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
