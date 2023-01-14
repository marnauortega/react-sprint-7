import React from "react";
import Field from "./Field";

function Subfields({ id, form, setForm }) {
  const field = form[id];

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

  return subFields;
}

export default Subfields;
