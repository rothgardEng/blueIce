"use client";

import { useEffect, useState } from "react";
import UserInputError from "../ErrorComponents/UserInputError";

export default function TextareaInput({
  language,
  value,
  updateFormValue,
  name,
  hasAttemptedSubmission,
  inputDisplayName,
  validation
}) {
  const [localValue, setLocalValue] = useState(value);
  const [inputErrors, setInputErrors] = useState({});
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (hasAttemptedSubmission) {
      validation( localValue, setInputErrors);
    }
  }, [localValue, hasAttemptedSubmission, name, validation, language]);

  const handleBlur = () => {
    updateFormValue(name, localValue); // Only update the parent on blur
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={`${name + language}`}
          className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
        >
          {`${language} ${inputDisplayName}:`}
        </label>
        <textarea
          rows="5"
          id={`${name + language}`}
          name={`${name + language}`}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <UserInputError
        errorObj={inputErrors}
        inputName={`${language} ${inputDisplayName}`}
      />
    </>
  );
}
