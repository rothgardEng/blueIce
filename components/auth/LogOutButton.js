"use client";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  function handleLogout() {
    signOut();
  }

  return (
    <button
      onClick={handleLogout}
      className="block py-3 px-3  rounded btn bg-dark text-white text-lg "
    >
      Logout
    </button>
  );
}
