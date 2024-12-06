"use client";
import { useEffect } from "react";
import { validateTitle } from "@/Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";

export default function TitelInput({
  language,
  formValues,
  setState,
  statePropertyName,
  hasAttemptedSubmission,
  titleErrors,
  setTitleErrors
}) {
  useEffect(() => {
    if (hasAttemptedSubmission) {
      validateTitle(
        `${statePropertyName + language}`,
        formValues[statePropertyName],
        setTitleErrors
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
          {`${language} title:`}
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

      <UserInputError errorObj={titleErrors} inputName={`${language} Title`} />
    </>
  );
}
