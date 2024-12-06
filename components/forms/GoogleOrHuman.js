"use client";
import { useState, useEffect } from "react";

export default function GoogleOrHuman({
  value,
  updateFormValue,
  name,
  inputDisplayName
}) {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    updateFormValue(name, localValue); // Only update the parent on blur
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="w-1/6 flex-shrink-0 font-medium text-right mr-4">
        {inputDisplayName}
      </p>
      <fieldset className="flex gap-6 ">
        <div className="flex gap-2">
          <input
            type="radio"
            id="Google Translated"
            name={name}
            value="Google Translated"
            checked={localValue === "Google Translated"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="Google Translated">Google Translated</label>
        </div>

        <div className="flex gap-2">
          <input
            type="radio"
            id="Human Translated"
            name={name}
            value="Human Translated"
            checked={localValue === "Human Translated"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="Human Translated">Human Translated</label>
        </div>
      </fieldset>
    </div>
  );
}
