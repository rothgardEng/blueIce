"use client";

import { useState, useEffect } from "react";
import { validateImgAlt } from "@/Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";

export default function AltTextInput({
  language,
  formValues,
  setState,
  statePropertyName,
  hasAttemptedSubmission,
  imgAltErrors,
  setImgAltErrors
}) {
  // const [imgAltErrors, setImgAltErrors] = useState({});

  useEffect(() => {
    if (hasAttemptedSubmission) {
      validateImgAlt(
        `${statePropertyName + language}`,
        formValues[statePropertyName],
        setImgAltErrors
      );
    }
  }, [
    formValues,
    hasAttemptedSubmission,
    language,
    setImgAltErrors,
    statePropertyName
  ]);

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
          {`${language} Alt Text:`}
        </label>
        <input
          type="text"
          id={`${statePropertyName + language}`}
          name={`${statePropertyName + language}`}
          value={formValues[statePropertyName]}
          onChange={handleChange}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <UserInputError
        errorObj={imgAltErrors}
        inputName={`${language} Atl Text`}
      />
    </>
  );
}
