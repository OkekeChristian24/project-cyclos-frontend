import React from "react";
import Hero from "../../Base/Hero";
import Autocomplete from "./Autocomplete";
import { City } from "./Autocomplete/City";
import { Country } from "./Autocomplete/Country";
export default function Bill() {
  return (
    <Hero>
      <div className="bill">
        <div className="bill__header">
          <div className="bill__header-icon">
            <svg
              aria-hidden="true"
              viewBox="0 0 512 512"
            >
              <path
                fill=""
                d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
              ></path>
            </svg>
          </div>
          <div className="bill__header-text">
            Have a Coupon?
            <span> Click here to enter your code</span>
          </div>
        </div>
        <form className="bill__body">
          <h3>Billing details</h3>
          <div className="input__row">
            <div className="input__outer">
              <label htmlFor="">Phone number</label>
              <input type="number" placeholder="Phone" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Street</label>
              <input type="text" placeholder="Street" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Town/City</label>
              <Autocomplete list={City} placeholder={"Town/City"} />
            </div>
            <div className="input__outer">
              <label htmlFor="">State</label>
              <input type="text" placeholder="State" />
            </div>
            <div className="input__outer">
              <label htmlFor="">Country/region</label>
              <Autocomplete list={Country} placeholder={"Country/region"} />
            </div>
            <div className="input__outer">
              <label htmlFor="">Postal code</label>
              <input type="number" placeholder="Postal code" />
            </div>
          </div>
        </form>
        <div className="bill__footer">
          <button className="button primary">Submit</button>
        </div>
      </div>
    </Hero>
  );
}
