import { useEffect } from "react";

const manageLocalStorage = (key, element, setState) => {
  // Load element on page load
  useEffect(() => {
    const retrieveElement = localStorage.getItem(key);
    if (retrieveElement) {
      setState(JSON.parse(retrieveElement));
    }
  }, []);

  // Save element to localStorage if it changes
  useEffect(() => localStorage.setItem(key, JSON.stringify(element)), [element]);
};

export default manageLocalStorage;
