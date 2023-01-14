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
      ...field,
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

  return (
    <>
      <div className={"field " + field.type}>
        <label htmlFor={field.name}>{field.text}</label>
        <QuantityButton increase={false} id={id} form={form} setForm={setForm} isValidNumber={isValidNumber} />
        <input type={field.type} id={field.name} {...valueOrChecked} onChange={handleField} />
        <QuantityButton increase={true} id={id} form={form} setForm={setForm} isValidNumber={isValidNumber} />
        <Help id={id} form={form} setForm={setForm} />
      </div>
      <Subfields key={field.id} id={field.id} form={form} setForm={setForm} />
    </>
  );
};

export default Field;
