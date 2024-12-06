"use client";
import { useState, useEffect } from "react";
import UserInputError from "../ErrorComponents/UserInputError";

export default function BodyInput({
  language,
  formValues,
  setState,
  statePropertyName,
  hasAttemptedSubmission,
  bodyErrors,
  setBodyErrors
}) {
   useEffect(() => {
    if (hasAttemptedSubmission) {
      validateBody(
        `${statePropertyName + language}`,
        formValues[statePropertyName],
        setBodyErrors
      );
    }
  }, [formValues[statePropertyName]]);

  const handleChange = (event) => {
    const { value } = event.target;

    setState((prevValues) => ({
      ...prevValues,
      [statePropertyName]: value
    }));
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={`${statePropertyName + language}`}
          className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
        >
          {`${language} Body:`}
        </label>
        <textarea
          row="10"
          id={`${statePropertyName + language}`}
          name={`${statePropertyName + language}`}
          value={formValues[statePropertyName]}
          onChange={handleChange}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <UserInputError errorObj={bodyErrors} inputName={`${language} Body`} />
    </>
  );
}
