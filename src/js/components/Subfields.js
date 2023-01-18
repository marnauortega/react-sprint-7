import React from "react";
import Field from "./Field";

function Subfields({ id, form, setForm, searchParams, setSearchParams }) {
  const field = form[id];

  let subFields;
  if (field.childIds.length && field.qty) {
    const subFieldObjects = form.filter((f) => field.childIds.includes(f.id));
    subFields = (
      <fieldset className="border">
        {subFieldObjects.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            form={form}
            setForm={setForm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        ))}
      </fieldset>
    );
  }

  return subFields;
}

export default Subfields;
