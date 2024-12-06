"use client";
import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";

export default function AssignedToSelection({
  name,
  editAssignedTo,
  setEditAssignedTo,
  text
}) {
  const handleChange = (e) => {
    setEditAssignedTo(e.value);
  };

  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      const res = await fetch(`${process.env.DOMAIN_PREFIX}/api/auth/admins`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setAdmins(data.admins);
    };
    fetchAdmins();
  }, []);

  let selectOptions = [];
  if (admins.length === 0) {
    return null;
  } else {
    selectOptions = admins.map((admin) => {
      return {
        value: `${admin.firstName} ${admin.lastName}`,
        label: `${admin.firstName} ${admin.lastName}`,
        email: admin.email
      };
    });
  }
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
    <div className="flex items-center space-x-4">
      <label htmlFor={name} className="w-1/6 flex-shrink-0 font-medium">
        {text}
      </label>
      <Select
        defaultValue={
          editAssignedTo
            ? [{ value: editAssignedTo, label: editAssignedTo }]
            : []
        }
        name={name}
        options={selectOptions}
        className="flex-grow border border-gray-300 rounded-md px-4 py-2 font-text"
        classNamePrefix="select"
        styles={colourStyles}
        onChange={handleChange}
      />
    </div>
  );
}
