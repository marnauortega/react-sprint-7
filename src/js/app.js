import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

let websitePrice = 0;
let SEOPrice = 0;
let adsPrice = 0;

const App = () => {
  const [thePrice, setPrice] = useState(0);

  const setWebsitePrice = (e) => {
    websitePrice = e.target.checked ? parseInt(e.target.value, 10) : 0;
    websitePrice = e.target.checked ? 500 : 0;
    setPrice(getTotal());
  };

  const setSEOPrice = (e) => {
    SEOPrice = e.target.checked ? parseInt(e.target.value, 10) : 0;
    setPrice(getTotal());
  };

  const setAdsPrice = (e) => {
    adsPrice = e.target.checked ? parseInt(e.target.value, 10) : 0;
    setPrice(getTotal());
  };

  const getTotal = () => {
    return websitePrice + SEOPrice + adsPrice;
  };

  return (
    <div className="card">
      <h1>Què vols fer?</h1>
      <form>
        <div className="field">
          <input id="website" type="checkbox" onChange={setWebsitePrice} value="500" />
          <label htmlFor="website">Una pàgina web (500€)</label>
        </div>
        <div className="field">
          <input id="seo" type="checkbox" onChange={setSEOPrice} value="300" />
          <label htmlFor="website">Una consultoria SEO (300€)</label>
        </div>
        <div className="field">
          <input id="ads" type="checkbox" onChange={setAdsPrice} value="200" />
          <label htmlFor="website">Una campanya de google Ads (200€)</label>
        </div>
      </form>
      <p>
        Preu: <span className="price">{thePrice}€</span>
      </p>
    </div>
  );
};

const root = document.querySelector("#root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
