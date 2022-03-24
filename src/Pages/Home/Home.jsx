import React from "react";
import Banner from "./Banner";
import Intro from "./Intro";
import Pay from "./Pay";
import Purchase from "./Purchase/Purchase";
import Reviews from "./Reviews/Reviews";
import Unique from "./Unique/unique";

export default function Home() {
  return (
    <>
      <Intro />
      <Purchase />
      {/* <Pay /> */}
      <Unique />
      <Banner />
      <Reviews />
    </>
  );
}
