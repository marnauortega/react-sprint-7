import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Form } from "./components/Form";

let websitePrice = 0;
let SEOPrice = 0;
let adsPrice = 0;

const App = () => {
  return (
    <div className="card">
      <h1>Què vols fer?</h1>
      <Form />
    </div>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
