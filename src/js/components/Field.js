import Subfields from "./Subfields";
import QuantityButton from "./QuantityButton";
import Help from "./Help";

const Field = ({ id, form, setForm, searchParams, setSearchParams, emptyForm, setShowRepresentation }) => {
  const field = form[id];

  function isValidNumber(value) {
    // only 0 or more digits, and cannot begin with "0"
    return /^(?!0)\d*$/.test(value);
  }

  function handleField(e) {
    const newForm = [...form];

    setShowRepresentation(true);

    // Checkbox qty update
    if (field.type === "checkbox") {
      newForm[id].qty = e.target.checked ? 1 : 0;

      searchParams.set([field.name], e.target.checked);
      setSearchParams(searchParams);
    }

    // Text value update
    if (field.type === "text") {
      newForm[id].input = e.target.value;
    }

    // Num qty update
    if (field.type === "num") {
      if (!isValidNumber(e.target.value)) return;

      newForm[id].qty = e.target.value;

      searchParams.set([field.name], e.target.value);
      setSearchParams(searchParams);
    }

    setForm(newForm);
  }

  // Prop for checkbox or prop for input
  let valueOrChecked;
  if (field.type === "text") valueOrChecked = { value: field.input };
  if (field.type === "checkbox") valueOrChecked = { checked: field.qty };
  if (field.type === "num") valueOrChecked = { value: field.qty };

  let placeholder;
  if (field.type === "text") placeholder = { placeholder: "cannot be empty" };

  return (
    <>
      <div className={"field " + field.type}>
        <label htmlFor={field.name}>
          {field.text}
          <Help id={id} form={form} setForm={setForm} />
        </label>

        <div className="quantities">
          <QuantityButton
            increase={false}
            id={id}
            form={form}
            setForm={setForm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setShowRepresentation={setShowRepresentation}
          />
          <QuantityButton
            increase={true}
            id={id}
            form={form}
            setForm={setForm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setShowRepresentation={setShowRepresentation}
          />
        </div>
        <input
          type={field.type}
          className={emptyForm ? "placeholder-shown" : ""}
          id={field.name}
          {...valueOrChecked}
          onChange={handleField}
          autoComplete="off"
          {...placeholder}
        />
      </div>
      <Subfields
        key={field.id}
        id={field.id}
        form={form}
        setForm={setForm}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setShowRepresentation={setShowRepresentation}
      />
    </>
  );
};

export default Field;
