"use client";
import { useState, useEffect } from "react";
import UserInputError from "../ErrorComponents/UserInputError";
import { getDisplayName } from "next/dist/shared/lib/utils";

export default function TextInput({
  language,
  value,
  updateFormValue,
  name,
  hasAttemptedSubmission,
  inputDisplayName,
  validation,
  inputType = "text"
}) {
  const [localValue, setLocalValue] = useState(value);
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (hasAttemptedSubmission && inputType === "text") {
      validation(
        localValue,
        setInputErrors,
        inputDisplayName
      );
    } else if (hasAttemptedSubmission && inputType === "password") {
      validation(localValue, name, setInputErrors);
    }
  }, [
    localValue,
    hasAttemptedSubmission,
    name,
    validation,
    language,
    inputDisplayName
  ]);

  const handleBlur = () => {
    updateFormValue(name, localValue);
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
        <input
          type={inputType}
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
