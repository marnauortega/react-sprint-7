import React, { useEffect } from "react";
import close from "../../images/close.svg";

function Budgets({ form, budgets, setBudgets, setForm, setEditing, setEditIndex, editing }) {
  const removeBudget = (index) => {
    const newBudgets = budgets.filter((budget, i) => i !== index);
    setBudgets(newBudgets);
  };

  //   To Merge in editing
  const editBudget = (index) => {
    const selectedBudget = budgets.find((budget, i) => i === index);
    const selectedForm = selectedBudget.form;

    const newForm = form.map((field, index) => {
      const f = selectedForm[index];

      const newInput = {
        id: f.id,
        name: f.name,
        input: f.input,
        qty: f.qty,
      };

      return {
        ...field,
        ...newInput,
      };
    });

    setForm(newForm);
    setEditing(true);
    setEditIndex(index);
  };

  const calculateLastEdit = () => {
    const newBudgets = budgets.map((budget) => {
      if (budget.editDate) {
        const dateDifference = new Date() - budget.editDate;
        let dayDifference = Math.floor(dateDifference / (24 * 60 * 60 * 1000));
        let dateDifferenceLeft = dateDifference - dayDifference * 24 * 60 * 60 * 1000;
        let hourDifference = Math.floor(dateDifferenceLeft / (60 * 60 * 1000));
        dateDifferenceLeft = dateDifference - hourDifference * 60 * 60 * 1000;
        let minuteDifference = Math.floor(dateDifferenceLeft / (60 * 1000));
        dateDifferenceLeft = dateDifference - minuteDifference * 60 * 1000;
        let secondDifference = Math.floor(dateDifferenceLeft / 1000);

        dayDifference = dayDifference ? `${dayDifference} días ` : "";
        hourDifference = hourDifference ? `${hourDifference} horas ` : "";
        minuteDifference = minuteDifference ? `${minuteDifference} minutos ` : "";
        secondDifference = secondDifference ? `${secondDifference} segundos ` : "";
        const noDifference = dayDifference || hourDifference || minuteDifference || secondDifference ? "" : "Now";

        const newBudget = {
          ...budget,
          lastEdit: dayDifference + hourDifference + minuteDifference + secondDifference + noDifference,
        };

        return newBudget;
      }
      return budget;
    });

    setBudgets(newBudgets);
  };

  useEffect(() => calculateLastEdit(), [budgets.length, editing]);

  return (
    <>
      <div className="budgets">
        <h1>Budgets</h1>
        {budgets.map((budget, index) => (
          <div key={budget.date} className="budget border">
        {budgets.map((budget, index) => {
          return (
            <div key={budget.id} className="budget border">
              <p>Nom: {budget.form.find((f) => f.name === "budget").input}</p>
              <p>Client: {budget.form.find((f) => f.name === "client").input}</p>
              <p>Creació: {budget.date.toLocaleString("es-ES")}</p>
              <p>Total: {budget.total}€</p>
              <p>Edited: {budget.lastEdit}</p>
              <button onClick={() => editBudget(index)}>Edit</button>
              <img className="icon" src={close} alt="close icon" onClick={() => removeBudget(index)} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Budgets;
