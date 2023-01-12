export const Field = ({ id, form, setForm }) => {
  const field = form[id];

  function isValidNumber(value) {
    // only 0 or more digits
    return /^\d*$/.test(value);
  }

  function handleField(e) {
    // Checkbox qty update
    let newQty;
    if (field.type === "checkbox") {
      newQty = {
        qty: e.target.checked ? 1 : 0,
      };
    }

    // Input value update
    if (field.type === "text") {
      if (!isValidNumber(e.target.value)) return;

      newQty = {
        qty: e.target.value,
      };
    }

    // State update
    const newField = {
      ...form[id],
      ...newQty,
    };
    const newForm = form.map((f) => (f.id === id ? newField : f));
    setForm(newForm);

    // // TODO: why doesn't this update the checkbox?
    // setForm((form) => {
    //   form[id].qty = e.target.checked;
    //   console.log("qty", form[id].qty);
    //   return form;
    // });
  }

  // Prop for checkbox or prop for input
  let valueOrChecked;
  if (field.type === "text") valueOrChecked = { value: field.qty };
  if (field.type === "checkbox") valueOrChecked = { checked: field.qty };

  // Button qty update
  const updateQty = (e, increase) => {
    e.preventDefault();

    let qtyValue;
    if (increase) {
      qtyValue = field.qty + 1;
    } else {
      qtyValue = isValidNumber(field.qty - 1) ? field.qty - 1 : 0;
    }

    let newQty = {
      qty: qtyValue,
    };

    // State update
    const newField = {
      ...form[id],
      ...newQty,
    };

    const newForm = form.map((f) => (f.id === id ? newField : f));
    setForm(newForm);
  };

  let increaseBtn;
  if (field.type === "text")
    increaseBtn = (
      <button className="quantity-update" onClick={(e) => updateQty(e, true)}>
        +
      </button>
    );
  let decreaseBtn;
  if (field.type === "text")
    decreaseBtn = (
      <button className="quantity-update" onClick={(e) => updateQty(e, false)}>
        -
      </button>
    );

  // Subfield generator
  let subFields;
  if (field.childIds.length && field.qty) {
    const subFieldObjects = form.filter((f) => field.childIds.includes(f.id));
    subFields = (
      <fieldset>
        {subFieldObjects.map((field) => (
          <Field key={field.id} id={field.id} form={form} setForm={setForm} />
        ))}
      </fieldset>
    );
  }

  return (
    <div className="field">
      {increaseBtn}
      <input type={field.type} id={field.name} {...valueOrChecked} onChange={handleField} />
      {decreaseBtn}
      <label htmlFor={field.name}>{field.text}</label>
      {subFields}
    </div>
  );
};
