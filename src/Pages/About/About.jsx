import React from "react";
import Banner from "./Banner";
import Intro from "./Intro";

import Purchase from "./Purchase/Purchase";
import Reviews from "./Reviews/Reviews";
import Unique from "./Unique/unique";

export default function Home() {
  return (
    <>
      <Intro />
      <Purchase />
      {/* <Unique /> */}
    
      {/* <Reviews /> */}
    </>
  );
}
