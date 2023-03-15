"use strict";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Budgets from "./Budgets";
import Representation from "./Representation";
import Form from "./Form";
let fields = require("../../data/products.json");
import manageLocalStorage from "../localStorage";

function Budget() {
  // Set default qty
  function resetForm() {
    fields.forEach((field) => {
      if (field.type === "checkbox") field.qty = 0;
      if (field.type === "text") field.input = "";
      if (field.type === "num") field.qty = field.base;
    });
  }
  resetForm();

  const [form, setForm] = useState(fields);
  manageLocalStorage("form", form, setForm);

  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  // Create Budget
  const [budgets, setBudgets] = useState([]);
  const [budgetsToPrint, setBudgetsToPrint] = useState([]);

  manageLocalStorage("budgets", budgets, setBudgets);
  manageLocalStorage("budgetsToPrint", budgetsToPrint, setBudgetsToPrint);

  // Get search params qties
  const [searchParams, setSearchParams] = useSearchParams();

  const [emptyForm, setEmptyForm] = useState(false);

  const [showRepresentation, setShowRepresentation] = useState(true);

  useEffect(() => {
    const newForm = form.map((field) => {
      let newQty = field.qty;

      for (const [key, value] of searchParams) {
        if (key === field.name) {
          if (field.type === "checkbox") newQty = value === "true" ? 1 : 0;
          if (field.type === "num") newQty = value ? parseInt(value) : 1;
        }
      }

      return {
        ...field,
        qty: newQty,
      };
    });

    setForm(newForm);
  }, []);

  function parseEmptyString(value) {
    if (!value) return 1;
    return parseInt(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyFields = form
      .filter((field) => field.type === "text")
      .map((field) => (field.input ? true : false))
      .includes(false);

    if (hasEmptyFields) {
      setEmptyForm(true);
      return;
    }

    setEmptyForm(false);

    // For uncompressed form, use the following
    const budgetForm = form;
    // For trimmed form, use the following
    // const budgetForm = form.map((f) => ({ id: f.id, name: f.name, input: f.input, qty: parseEmptyString(f.qty) }));
    const budget = { id: budgets.length, date: Date.now(), lastEdit: "", form: budgetForm, total: calculateTotal() };

    let newBudgets;
    if (!editing) {
      newBudgets = [...budgets, budget];
    } else {
      newBudget = {
        ...budgets[editIndex],
        editDate: Date.now(),
        form: budget.form,
        total: calculateTotal(),
      };
      newBudgets = [...budgets];
      newBudgets[editIndex] = newBudget;
    }

    setBudgets(newBudgets);
    setBudgetsToPrint(newBudgets);
    setEditing(false);
    setShowRepresentation(false);
    // resetForm();
    // setForm(fields);
  };

  const infoRoot = form.find((o) => o.name === "infoRoot");
  const infoFields = form.filter((f) => infoRoot.childIds.includes(f.id));
  const serviceRoot = form.find((o) => o.name === "serviceRoot");
  const mainFields = form.filter((f) => serviceRoot.childIds.includes(f.id));
  const fieldsToPrint = infoFields.concat(mainFields);

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

  return (
    <main>
      <Form
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        calculateTotal={calculateTotal}
        fieldsToPrint={fieldsToPrint}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        emptyForm={emptyForm}
        setShowRepresentation={setShowRepresentation}
      />
      {showRepresentation && <Representation form={form} />}
      {!showRepresentation && (
        <Budgets
          form={form}
          budgets={budgets}
          setBudgets={setBudgets}
          setForm={setForm}
          setEditing={setEditing}
          setEditIndex={setEditIndex}
          editing={editing}
          budgetsToPrint={budgetsToPrint}
          setBudgetsToPrint={setBudgetsToPrint}
          setShowRepresentation={setShowRepresentation}
        />
      )}
    </main>
  );
}

export default Budget;
