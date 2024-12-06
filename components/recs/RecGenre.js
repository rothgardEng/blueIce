"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import UserInputError from "../ErrorComponents/UserInputError";

export default function RecGenre({
  name,
  edit,
  value,
  updateSelectValue,
  hasAttemptedSubmission,
  validation
}) {
  const [localValue, setLocalValue] = useState(value);
  const [inputErrors, setInputErrors] = useState({});
  const handleBlur = () => {
    updateSelectValue(localValue); // Only update the parent on blur
  };

  const handleChange = (selectedOption) => {
    setLocalValue(selectedOption ? selectedOption.value : "");
  };

  useEffect(() => {
    if (hasAttemptedSubmission) {
      validation("news category", localValue, setInputErrors);
    }
  }, [localValue, name, hasAttemptedSubmission, validation]);

  const colourStyles = {
    control: function (styles, { isFocused }) {
      return {
        ...styles,
        "&:hover": "none",
        border: isFocused ? "2px solid black" : "1px solid lightgrey",
        boxShadow: "none" // no box-shadow
      };
    },
    option: function (styles, { data, isDisabled, isFocused, isSelected }) {
      return {
        ...styles
      };
    },
    input: function (styles) {
      return {
        ...styles
      };
    },
    placeholder: function (styles) {
      return styles;
    },
    singleValue: function (styles, { data }) {
      return styles;
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={name}
          className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
        >
          Category:
        </label>
        <Select
          value={localValue ? { value: localValue, label: localValue } : null}
          name={name}
          options={[
            { value: "Biography", label: "Biography" },
            { value: "Alternatives", label: "Alternatives" },
            { value: "History", label: "History" },
            { value: "Police Brutality", label: "Police Brutality" },
            { value: "Other", label: "Other" }
          ]}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 font-text"
          classNamePrefix="select"
          styles={colourStyles}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <UserInputError
        errorObj={inputErrors}
        inputName="Selection"
        singular="true"
      />
    </>
  );
}
