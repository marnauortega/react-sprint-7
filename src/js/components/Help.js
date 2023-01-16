import React, { useState } from "react";
import helpImage from "./../../images/help.svg";

function Help({ id, form, setForm }) {
  const field = form[id];
  const help = field.help;

  const [active, setActive] = useState(false);

  if (!help) return;

  return (
    <>
      <img
        src={helpImage}
        className="icon"
        alt="help icon"
        onClick={() => {
          setActive(true);
          console.log(active);
        }}
      />
      {active && <Overlay help={help} setActive={setActive} />}
    </>
  );
}

function Overlay({ help, setActive }) {
  return (
    <>
      <div className="overlay">
        <div className="overlay-background" onClick={() => setActive(false)}></div>
        <div className="overlay-card border">{help}</div>
      </div>
    </>
  );
}

export default Help;
