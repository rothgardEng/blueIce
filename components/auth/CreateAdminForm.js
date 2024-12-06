"use client";
import { useState, useEffect, useCallback } from "react";
import {
  validateName,
  validateEmail,
  passwordCheck,
  confirmMatch
} from "../../Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";
import TextInput from "../forms/TextInput";

function CreateAdminForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({});
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState({});
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState({});
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState({});
  const [isOverlord, setIsOverlord] = useState(false);
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [adminWasCreated, setAdminWasCreated] = useState(false);

  const updateFirstName = useCallback((name, value) => {
    setFirstName(value);
  },[]);

  const updateLastName = useCallback((name, value) => {
    setLastName(value);
  },[]);

  const updateEmail = useCallback((name, value) => {
    setEmail(value);
  },[]);

  const updatePassword = useCallback((name, value) => {
    setPassword(value);
  },[]);

  useEffect(() => {
    if (hasAttemptedSubmission) {
      confirmMatch(
        password,
        confirmPassword,
        "confirmPassword",
        "Passwords",
        setConfirmPasswordError
      );
    }
  }, [confirmPassword, password, hasAttemptedSubmission]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    setHasAttemptedSubmission(true);

    const tempFirstNameError = validateName(
      firstName,
      setFirstNameError,
      "First Name"
    );
    const tempLastNameError = validateName(
      lastName,
      setLastNameError,
      "Last Name"
    );
    const tempEmailError = validateEmail(email, setEmailError);
    const tempPasswordError = passwordCheck(
      password,
      "password",
      setPasswordError
    );
    const tempConfirmPasswordError = confirmMatch(
      password,
      confirmPassword,
      "confirmPassword",
      "Passwords",
      setConfirmPasswordError
    );

    if (
      Object.keys(tempFirstNameError).length > 0 ||
      Object.keys(tempLastNameError).length > 0 ||
      Object.keys(tempEmailError).length > 0 ||
      Object.keys(tempPasswordError).length > 0 ||
      Object.keys(tempConfirmPasswordError).length > 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.DOMAIN_PREFIX}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            isOverlord
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setAdminWasCreated(true);
      } else {
        throw new Error(
          result.message || result.error || "Failed to create admin."
        );
      }
    } catch (err) {
      setErrors({
        formSubmit: err.message || "An unexpected error occurred."
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitRefresh(event) {
    event.preventDefault();
    setAdminWasCreated(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setIsOverlord(false);
    setEmailError({});
    setPasswordError({});
    setConfirmPasswordError({});
    setHasAttemptedSubmission(false);
    setFirstNameError({});
    setLastNameError({});
    setErrors({});
  }



  if (adminWasCreated){
    return (
      <section className="w-full max-w-md mx-auto mt-8 pb-8 mb-8 offWhite shadow-lg rounded-lg p-6">
        <h1 className="text-2xl mb-4 font-header text-center">
          New Admin successfully Created!
        </h1>
        <h3 className="text-2x1 font-text text-center mb-8">
          {firstName} {lastName} has been added as an admin under {email}
        </h3>
        <form
          onSubmit={handleSubmitRefresh}
          className="space-y-4 font-text text-center"
        >
          <div className="flex items-center justify-center">
            <button
              className="py-3 px-6 rounded btn bg-dark text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add another Admin"}
            </button>
          </div>
        </form>
      </section>
    );
  }

    return (
      <section className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 mx-auto mt-8 pb-8 mb-8 offWhite shadow-lg rounded-lg p-6">
        <h1 className="text-2xl mb-4 font-header text-center">
          Create New Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 font-text text-center">
          <TextInput
            language=""
            value={firstName}
            updateFormValue={updateFirstName}
            name="firstName"
            inputDisplayName="First Name"
            hasAttemptedSubmission={hasAttemptedSubmission}
            validation={validateName}
          ></TextInput>

          <TextInput
            language=""
            value={lastName}
            updateFormValue={updateLastName}
            name="lastName"
            inputDisplayName="Last Name"
            hasAttemptedSubmission={hasAttemptedSubmission}
            validation={validateName}
          ></TextInput>

          <TextInput
            language=""
            value={email}
            updateFormValue={updateEmail}
            name="Email"
            inputDisplayName="Email"
            hasAttemptedSubmission={hasAttemptedSubmission}
            validation={validateEmail}
          ></TextInput>

          <TextInput
            language=""
            value={password}
            updateFormValue={updatePassword}
            name="Password"
            inputDisplayName="Password"
            hasAttemptedSubmission={hasAttemptedSubmission}
            validation={passwordCheck}
            inputType="password"
          ></TextInput>

          <div className="flex items-center justify-center space-x-4">
            <label
              htmlFor="confirmPassword"
              className="w-1/4 sm:w-1/5 md:w-1/6 font-medium text-right mr-4"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-grow border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <UserInputError
            errorObj={confirmPasswordError}
            inputName="Confirm Password"
          />

          <div className="flex items-center justify-start space-x-4">
            <label
              htmlFor="overlord"
              className="w-1/4 sm:w-1/5 md:w-1/6 font-medium text-right mr-4"
            >
              Web Master:
            </label>
            <input
              type="checkbox"
              id="overlord"
              value={isOverlord}
              onChange={(e) => setIsOverlord(e.target.checked)}
              className="ml-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="py-3 px-6 rounded btn bg-dark text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create new Admin"}
            </button>
          </div>
        </form>
        <UserInputError errorObj={errors} inputName="Admin Creation" />
      </section>
    );

}

export default CreateAdminForm;
