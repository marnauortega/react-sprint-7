import { useEffect, useState } from "react";
let fields = require("../../data/products.json");

export const Form = () => {
  // Set default qty
  fields.forEach((field) => {
    if (field.type === "checkbox") field.qty = 0;
    if (field.type === "text") field.qty = 1;
  });

  const [form, setForm] = useState(fields);

  const root = fields[0];
  const mainFields = form.filter((f) => root.childIds.includes(f.id));

  const calculateTotal = () => {
    // Total of mainFields
    const mainFieldsTotal = mainFields.reduce((acc, field) => {
      return field.qty * field.price + acc;
    }, 0);

    // Total of subFields (with active parents)
    const activeMainFields = mainFields.filter((f) => f.qty);
    const subFieldIds = activeMainFields.reduce((acc, f) => [...acc, ...f.childIds], []);
    const subFields = subFieldIds.map((id) => form[id]);
    const subFieldsTotal = subFields.reduce((acc, field) => {
      let multiplier = 1;

      // If field is a multiplier-field, set its multiplier value
      if (field.multiplier) {
        multiplier = field.multipliedIds.reduce(
          (acc, id) => (Math.max(form[id].qty - form[id].base, 0) + field.base) * acc,
          1
        );
        // Multiplier should always be at least 1
        multiplier = Math.max(multiplier, 1);
      }

      //Avoid negatives when a 1-based service is set to 0 units
      let qty = field.base ? Math.max(field.qty - field.base, 0) : field.qty;

      return qty * field.price * multiplier + acc;
    }, 0);

    return mainFieldsTotal + subFieldsTotal;
  };

  const total = calculateTotal();

  return (
    <form>
      {mainFields.map((field) => (
        <Field key={field.id} id={field.id} form={form} setForm={setForm} />
      ))}
      <p>
        Preu: <span className="price">{total}€</span>
      </p>
    </form>
  );
};

const Field = ({ id, form, setForm }) => {
  const field = form[id];

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
      function isValidNumber(value) {
        // only 0 or more digits
        return /^\d*$/.test(value);
      }
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
      <input type={field.type} id={field.name} {...valueOrChecked} onChange={handleField} />
      <label htmlFor={field.name}>{field.text}</label>
      {subFields}
    </div>
  );
};
