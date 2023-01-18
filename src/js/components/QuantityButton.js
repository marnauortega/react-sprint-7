import React from "react";

function QuantityButton({ increase, id, form, setForm, searchParams, setSearchParams }) {
  const field = form[id];

  // Button qty update
  const updateQty = (e, increase) => {
    e.preventDefault();

    const newForm = [...form];
    if (increase) {
      newForm[id].qty = field.qty ? parseInt(field.qty) + 1 : 1;
    } else {
      newForm[id].qty = field.qty - 1 > 0 ? field.qty - 1 : 1;
    }
    setForm(newForm);

    searchParams.set([field.name], newForm[id].qty);
    setSearchParams(searchParams);
  };

  let quantityButton;
  if (field.type === "num")
    quantityButton = (
      <button className="quantity-update icon" onClick={(e) => updateQty(e, increase)}>
        {increase ? "+" : "-"}
      </button>
    );

  return quantityButton;
}

export default QuantityButton;
