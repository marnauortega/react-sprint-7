import Field from "./Field";

function Subfields({ id, form, setForm, searchParams, setSearchParams, setShowRepresentation }) {
  const field = form[id];

  let subFields;
  if (field.childIds.length && field.qty) {
    const subFieldObjects = form.filter((f) => field.childIds.includes(f.id));
    subFields = (
      <fieldset className="subfields">
        {subFieldObjects.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            form={form}
            setForm={setForm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setShowRepresentation={setShowRepresentation}
          />
        ))}
      </fieldset>
    );
  }

  return subFields;
}

export default Subfields;
