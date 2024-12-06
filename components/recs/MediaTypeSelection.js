"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import UserInputError from "../ErrorComponents/UserInputError";

export default function MediaTypeSelection({
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
    control: (styles, { isFocused }) => ({
      ...styles,
      "&:hover": "none",
      border: isFocused ? "2px solid black" : "1px solid lightgrey",
      boxShadow: "none"
    }),
    option: (styles) => ({
      ...styles
    }),
    input: (styles) => ({
      ...styles
    }),
    placeholder: (styles) => styles,
    singleValue: (styles) => styles
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={name}
          className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
        >
          Media Type:
        </label>
        <Select
          value={localValue ? { value: localValue, label: localValue } : null}
          name={name}
          options={[
            { value: "Book", label: "Book" },
            { value: "Video", label: "Video" },
            { value: "Movie", label: "Movie" },
            { value: "Article", label: "Article" },
            { value: "Podcast", label: "Podcast" },
            { value: "Pamphlet", label: "Pamphlet" },
            { value: "Document", label: "Document" },
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
