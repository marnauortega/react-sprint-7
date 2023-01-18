import React from "react";

function QuantityButton({ increase, id, form, setForm, searchParams, setSearchParams }) {
  const field = form[id];

  // Button qty update
  const updateQty = (e, increase) => {
    e.preventDefault();

    let qtyValue;
    if (increase) {
      qtyValue = field.qty ? parseInt(field.qty) + 1 : 1;
    } else {
      qtyValue = field.qty - 1 > 0 ? field.qty - 1 : 1;
    }

    let newQty = {
      qty: qtyValue,
    };

    // State update
    const newField = {
      ...field,
      ...newQty,
    };

    const newForm = form.map((f) => (f.id === id ? newField : f));
    setForm(newForm);

    searchParams.set([field.name], qtyValue);
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
