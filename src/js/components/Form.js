import { useState } from "react";
import Field from "./Field";

const Form = ({ form, setForm, handleSubmit, calculateTotal, fieldsToPrint, searchParams, setSearchParams }) => {
  const total = calculateTotal();

  return (
    <div className="form-container border">
      <h1>Què vols fer?</h1>
      <form onSubmit={handleSubmit}>
        {fieldsToPrint.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            form={form}
            setForm={setForm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        ))}
        <p>
          Preu: <span className="price">{total}€</span>
        </p>
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
};

export default Form;
