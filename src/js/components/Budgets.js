import { useState, useEffect } from "react";
import close from "../../images/close.svg";

function Budgets({
  form,
  budgets,
  setBudgets,
  setForm,
  setEditing,
  setEditIndex,
  editing,
  budgetsToPrint,
  setBudgetsToPrint,
  setShowRepresentation,
}) {
  const removeBudget = (index, e) => {
    e.stopPropagation();
    console.log("removing");
    const newBudgets = budgets.filter((budget, i) => i !== index);
    setBudgets(newBudgets);
    setBudgetsToPrint(newBudgets);
    setShowRepresentation(false);
  };

  const removeAllBudgets = () => {
    setBudgets([]);
    setBudgetsToPrint([]);
  };

  //   To Merge in editing
  const editBudget = (index) => {
    console.log("editing");
    const selectedBudget = budgets.find((budget, i) => i === index);
    const selectedForm = selectedBudget.form;

    const newForm = form.map((field, index) => {
      const f = selectedForm[index];

      return {
        ...field,
        id: f.id,
        name: f.name,
        input: f.input,
        qty: f.qty,
      };
    });

    setForm(newForm);
    setEditing(true);
    setShowRepresentation(true);
    setEditIndex(index);
  };

  const calculateLastEdit = () => {
    const newBudgets = budgets.map((budget) => {
      if (budget.editDate) {
        const dateDifference = Date.now() - budget.editDate;
        let dayDifference = Math.floor(dateDifference / (24 * 60 * 60 * 1000));
        let dateDifferenceLeft = dateDifference - dayDifference * 24 * 60 * 60 * 1000;
        let hourDifference = Math.floor(dateDifferenceLeft / (60 * 60 * 1000));
        dateDifferenceLeft = dateDifference - hourDifference * 60 * 60 * 1000;
        let minuteDifference = Math.floor(dateDifferenceLeft / (60 * 1000));
        dateDifferenceLeft = dateDifference - minuteDifference * 60 * 1000;
        let secondDifference = Math.floor(dateDifferenceLeft / 1000);

        dayDifference = dayDifference ? `${dayDifference} days ` : "";
        hourDifference = hourDifference ? `${hourDifference} hours ` : "";
        minuteDifference = minuteDifference ? `${minuteDifference} minutes ` : "";
        secondDifference = secondDifference ? `${secondDifference} seconds ` : "";
        const noDifference = dayDifference || hourDifference || minuteDifference || secondDifference ? "" : "now";

        return {
          ...budget,
          lastEdit: dayDifference + hourDifference + minuteDifference + secondDifference + noDifference,
        };
      }
      return budget;
    });

    setBudgets(newBudgets);
    setBudgetsToPrint(newBudgets);
  };

  useEffect(() => calculateLastEdit(), [budgets.length, editing]);

  const [nameAsc, setNameAsc] = useState(true);
  const [dateAsc, setDateAsc] = useState(true);
  const [totalAsc, setTotalAsc] = useState(true);

  const filterByName = (ascending) => {
    const newBudgets = [...budgets];
    const sortedBudgets = newBudgets.sort((a, b) => {
      const aName = a.form.find((f) => f.name === "budget").input;
      const bName = b.form.find((f) => f.name === "budget").input;
      if (ascending) return aName < bName ? -1 : 1;
      if (!ascending) return aName < bName ? 1 : -1;
      return 0;
    });
    setBudgets(sortedBudgets);
    setBudgetsToPrint(sortedBudgets);
    nameAsc === true ? setNameAsc(false) : setNameAsc(true);
  };

  const filterByDate = (ascending) => {
    const newBudgets = [...budgets];
    const sortedBudgets = newBudgets.sort((a, b) => (ascending ? a.date - b.date : b.date - a.date));
    setBudgets(sortedBudgets);
    setBudgetsToPrint(sortedBudgets);
    dateAsc === true ? setDateAsc(false) : setDateAsc(true);
  };

  const filterByTotal = (ascending) => {
    const newBudgets = [...budgets];
    const sortedBudgets = newBudgets.sort((a, b) => {
      if (ascending) return a.total < b.total ? -1 : 1;
      if (!ascending) return a.total < b.total ? 1 : -1;
      return 0;
    });
    setBudgets(sortedBudgets);
    setBudgetsToPrint(sortedBudgets);
    totalAsc === true ? setTotalAsc(false) : setTotalAsc(true);
  };

  let searchValue;

  const search = (e) => {
    searchValue = e.target.value;

    let filteredBudgets;

    if (searchValue) {
      const newBudgets = [...budgets];
      filteredBudgets = newBudgets.filter(
        (budget) => budget.form.find((f) => f.name === "budget").input === e.target.value
      );
    }

    searchValue ? setBudgetsToPrint(filteredBudgets) : setBudgetsToPrint(budgets);
  };

  return (
    <>
      <div className="budgets">
        <div className="filters">
          <div className="row">
            <button className="button" onClick={() => filterByName(nameAsc)}>
              Alphabetical
            </button>
            <button className="button" onClick={() => filterByDate(dateAsc)}>
              Chronological
            </button>
            <button className="button" onClick={() => filterByTotal(totalAsc)}>
              Total
            </button>
          </div>
          <div className="row">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" onChange={search} placeholder="search" />
            </form>
            <button className="button remove" onClick={() => removeAllBudgets()}>
              Remove all
            </button>
          </div>
        </div>
        {budgetsToPrint.map((budget, index) => {
          return (
            <div key={budget.id} className="budget border" onClick={() => editBudget(index)}>
              <div className="first-row row">
                <div className="start">
                  <p>{budget.form.find((f) => f.name === "budget").input}</p>
                  <p>{budget.form.find((f) => f.name === "client").input}</p>
                </div>
                <p className="created-at">
                  created at <br />
                  {new Date(budget.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                  <br />
                  {new Date(budget.date).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="delete" onClick={(e) => removeBudget(index, e)}>
                  delete
                </p>
              </div>
              <div className="second-row row">
                <div>
                  {budget.form.find((f) => f.name === "website").qty ? (
                    <>
                      <p>
                        {budget.form.find((f) => f.name === "pages").qty} page
                        {budget.form.find((f) => f.name === "pages").qty > 1 ? "s" : ""}
                      </p>
                      <p>
                        {budget.form.find((f) => f.name === "languages").qty} lang
                        {budget.form.find((f) => f.name === "languages").qty > 1 ? "s" : ""}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                  <p>{budget.form.find((f) => f.name === "SEO").qty ? "SEO" : ""}</p>
                  <p>{budget.form.find((f) => f.name === "marketing").qty ? "Ads" : ""}</p>
                </div>
                {budget.lastEdit && (
                  <p className="edited">
                    edited <br /> {budget.lastEdit} {budget.lastEdit === "now" ? "" : "ago"}
                  </p>
                )}
              </div>
              <div className="third-row row">
                <p>
                  Total <br />
                  {budget.total}€
                </p>
                <div className="page-icons">
                  {[...Array(budget.form.find((f) => f.name === "pages").qty)].map((e, i) => (
                    <div key={i} className="page-icon"></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Budgets;
