import { useState } from "react";
import Field from "./Field";

const Form = ({
  form,
  setForm,
  handleSubmit,
  calculateTotal,
  fieldsToPrint,
  searchParams,
  setSearchParams,
  emptyForm,
  setShowRepresentation,
}) => {
  const total = calculateTotal();

  return (
    <div className="container form-container">
      <h1>Budget</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          {fieldsToPrint.map((field) => (
            <Field
              key={field.id}
              id={field.id}
              form={form}
              setForm={setForm}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              emptyForm={emptyForm}
              setShowRepresentation={setShowRepresentation}
            />
          ))}
        </div>
        <div>
          <p className="field total">
            Total <span>{total}€</span>
          </p>
          <input type="submit" value="Save" className="button" />
        </div>
      </form>
    </div>
  );
};

export default Form;
