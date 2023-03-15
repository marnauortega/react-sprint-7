import { useState, useEffect } from "react";

const Representation = ({ form }) => {
  const [cardsArray, setCardsArray] = useState("");

  useEffect(() => {
    if (form.find((f) => f.name === "pages").qty)
      setCardsArray(
        [...Array(parseInt(form.find((f) => f.name === "pages").qty))].map((e, i) => (
          <div className="card" key={i}></div>
        ))
      );
  }, [form.find((f) => f.name === "pages").qty]);

  // const numberOfLangs = ;
  // //   const SEO = form.find((f) => f.name === "SEO").qty;
  // const marketing = form.find((f) => f.name === "marketing").qty;

  //   let cardsArray = [...Array(parseInt(form.find((f) => f.name === "pages").qty))].map((e, i) => (
  //     <div className="card" key={i}></div>
  //   ));
  return <div className="cards-wrapper">{cardsArray}</div>;
};

export default Representation;
