/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";

// Value Returner
export const ValueChecker = (holder, string) => {
  return holder ? (
    <div className="Desc-Container">
      <p className="title"> {string} </p>
      <p className="desc"> {holder} </p>
    </div>
  ) : (
    ""
  );
};

// Debouncing
export const debouncedSetQuery = ({ term, setSearch }) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setSearch(term);
  }, 500);
};

// ---
export const ReactSelect = ({ options, setValue, value, inputValue }) => {
  return (
    <Select
      value={value}
      options={options}
      onChange={(e) => setValue(e)}
      onInputChange={(input) => {
        if (inputValue) {
          inputValue(input);
        }
      }}
    />
  );
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
};

export { ScrollToTop };
