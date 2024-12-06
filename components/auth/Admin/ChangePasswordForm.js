"use client";
import { useState, useEffect } from "react";
import { confirmMatch, passwordCheck } from "../../../Lib/validation";
import UserInputError from "../../ErrorComponents/UserInputError";

function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState({});
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (hasAttemptedSubmission) {
      confirmMatch(
        newPassword,
        confirmPassword,
        "confirmPassword",
        "Passwords",
        setConfirmPasswordError
      );
    }
  }, [confirmPassword, newPassword, hasAttemptedSubmission]);

  useEffect(() => {
    if (hasAttemptedSubmission) {
      passwordCheck(newPassword, "password", setNewPasswordError);
    }
  }, [newPassword, hasAttemptedSubmission]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setHasAttemptedSubmission(true);

    const tempConfirmPasswordError = confirmMatch(
      newPassword,
      confirmPassword,
      "confirmPassword",
      "Passwords",
      setConfirmPasswordError
    );

    const tempNewPasswordError = passwordCheck(
      newPassword,
      "password",
      setNewPasswordError
    );

    if (
      Object.keys(tempConfirmPasswordError).length > 0 ||
      Object.keys(tempNewPasswordError).length > 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.DOMAIN_PREFIX}/api/auth/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            oldPassword,
            newPassword
          })
        }
      );
      const result = await response.json();

      if (result.success) {
        setPasswordChanged(true);
      } else {
        throw new Error(
          result.message || result.error || "Failed to change password"
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

  if (passwordChanged) {
    return (
      <section className="w-full text-center max-w-md mx-auto mt-28 mb-28 offWhite shadow-lg rounded-lg p-6 flex items-center justify-center">
        <h2 className="text-3xl font-header">Password Changed!</h2>
      </section>
    );
  }

  return (
    <div className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 mx-auto mt-8 pb-8 mb-auto offWhite shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4 font-text text-center">
        <h2 className="text-2xl mb-4 font-header">Change Password</h2>

        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="old-password"
            className="w-1/4 sm:w-1/5 md:w-1/6 font-medium text-right mr-4"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="new-password"
            className="w-1/4 sm:w-1/5 md:w-1/6 font-medium text-right mr-4"
          >
            New Password:
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <UserInputError errorObj={newPasswordError} inputName="Password" />

        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="confirm-password"
            className="w-1/4 sm:w-1/5 md:w-1/6 font-medium text-right mr-4"
          >
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <UserInputError
          errorObj={confirmPasswordError}
          inputName="Confirm Password"
        />

        <div className="flex items-center justify-center">
          <button className="py-3 px-6 rounded btn bg-dark text-white text-lg">
            {loading ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
      <UserInputError errorObj={errors} inputName="Form Errors" />
    </div>
  );
}

export default ChangePasswordForm;
