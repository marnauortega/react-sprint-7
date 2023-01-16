import { useEffect } from "react";

const manageLocalStorage = (element, setState) => {
  // Load element on page load
  useEffect(() => {
    const retrieveElement = localStorage.getItem(`${element}`);
    if (retrieveElement) {
      // console.log(localStorage.getItem(`${element}`));
      setState(JSON.parse(retrieveElement));
    }
  }, []);

  // Save element to localStorage if it changes
  useEffect(() => localStorage.setItem(`${element}`, JSON.stringify(element)), [element]);
};

export default manageLocalStorage;
