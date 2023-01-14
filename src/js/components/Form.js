import { useEffect, useState } from "react";
import { Field } from "./Field";
let fields = require("../../data/products.json");

const Form = () => {
  // Set default qty
  fields.forEach((field) => {
    if (field.type === "checkbox") field.qty = 0;
    if (field.type === "text") field.qty = 1;
  });

  const [form, setForm] = useState(fields);

  // Load form on page load
  useEffect(() => {
    const retrieveForm = localStorage.getItem("form");
    if (retrieveForm) {
      console.log(localStorage.getItem("form"));
      setForm(JSON.parse(retrieveForm));
    }
  }, []);

  // Save form to localStorage if it changes
  useEffect(() => localStorage.setItem("form", JSON.stringify(form)), [form]);

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

export default Form;
