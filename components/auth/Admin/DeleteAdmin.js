"use client";
import { useState } from "react";
import AdminSelectionWithoutSelf from "../AdminSelectionWithoutSelf";
import UserInputError from "../../ErrorComponents/UserInputError";

export default function DeleteAdmin() {
  const [adminToDelete, setAdminToDelete] = useState("");
  const [emailToDelete, setEmailToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sucDeleted, setSucDeleted] = useState(false);

  const handleDeleteAnother = () => {
    setSucDeleted(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const url = `${process.env.DOMAIN_PREFIX}/api/auth/admins/${emailToDelete}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const result = await response.json();
      if (result.success) {
        setSucDeleted(true);
        setLoading(false);
        setAdminToDelete("");
        setEmailToDelete("");
      } else {
        throw new Error(
          result.message || result.error || "Failed to delete admin"
        );
      }
    } catch (error) {
      setErrors({
        formSubmit:
          error.message ||
          "An unexpected error occurred. Please try again laster"
      });
      setAdminToDelete("");
      setEmailToDelete("");
    } finally {
      setLoading(false);
    }
  }

  if (sucDeleted) {
    return (
      <section className="w-full text-center max-w-md mx-auto mt-28 mb-28 offWhite shadow-lg rounded-lg p-6 flex items-center justify-center">
        <h2 className="text-3xl font-header">Admin Deleted!</h2>
        <button
          onClick={handleDeleteAnother}
          className="py-3 px-6 rounded btn bg-dark text-white text-lg"
        >
          Delete Another
        </button>
      </section>
    );
  }

  return (
    <section className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 mx-auto mt-8 pb-8 mb-8 offWhite shadow-lg rounded-lg p-6">
      <h1 className="text-2xl mb-4 font-header text-center">Delete Admin:</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AdminSelectionWithoutSelf
          name="toDelete"
          defaultSelection={adminToDelete}
          updateSelection={setAdminToDelete}
          updateEmail={setEmailToDelete}
          text="Select an Admin:"
          setErrors={setErrors}
        ></AdminSelectionWithoutSelf>

        <div className="flex items-center justify-center">
          <button
            disabled={adminToDelete === ""}
            className="py-3 px-6 rounded btn bg-dark text-white text-lg"
          >
            {loading ? "Loading..." : "Delete Admin"}
          </button>
        </div>
      </form>
      <UserInputError errorObj={errors} inputName="Form Errors" />
    </section>
  );
}
