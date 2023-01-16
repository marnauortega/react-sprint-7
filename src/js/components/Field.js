import Subfields from "./Subfields";
import QuantityButton from "./QuantityButton";
import Help from "./Help";

const Field = ({ id, form, setForm }) => {
  const field = form[id];

  function isValidNumber(value) {
    // only 0 or more digits, and cannot begin with "0"
    return /^(?!0)\d*$/.test(value);
  }

  function handleField(e) {
    // Checkbox qty update
    let newInput;
    if (field.type === "checkbox") {
      newInput = {
        qty: e.target.checked ? 1 : 0,
      };
    }

    // Text value update
    if (field.type === "text") {
      newInput = {
        input: e.target.value,
      };
    }

    // Num qty update
    if (field.type === "num") {
      if (!isValidNumber(e.target.value)) return;

      newInput = {
        qty: e.target.value,
      };
    }

    // // TODO: why doesn't this update the checkbox?
    // setForm((form) => {
    //   form[id].qty = e.target.checked;
    //   console.log("qty", form[id].qty);
    //   return form;
    // });

    // State update
    const newField = {
      ...field,
      ...newInput,
    };
    const newForm = form.map((f) => (f.id === id ? newField : f));
    setForm(newForm);
  }

  // Prop for checkbox or prop for input
  let valueOrChecked;
  if (field.type === "text") valueOrChecked = { value: field.input };
  if (field.type === "checkbox") valueOrChecked = { checked: field.qty };
  if (field.type === "num") valueOrChecked = { value: field.qty };

  return (
    <>
      <div className={"field " + field.type}>
        <label htmlFor={field.name}>{field.text}</label>
        <QuantityButton increase={false} id={id} form={form} setForm={setForm} />
        <input type={field.type} id={field.name} {...valueOrChecked} onChange={handleField} />
        <QuantityButton increase={true} id={id} form={form} setForm={setForm} />
        <Help id={id} form={form} setForm={setForm} />
      </div>
      <Subfields key={field.id} id={field.id} form={form} setForm={setForm} />
    </>
  );
};

export default Field;
