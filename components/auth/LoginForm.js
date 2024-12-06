"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import goToConsole from "@/Lib/navActions/goToConsole";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    if (result.error) {
      setError("Incorrect Email or Password");
      setLoading(false);
    } else {
      goToConsole();
    }
  }

  return (
    <section className="w-full max-w-md mx-auto mt-8 pb-8 mb-8 offWhite shadow-lg rounded-lg p-6">
      <h1 className="text-2xl mb-4 font-header text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4 font-text text-center">
        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="email"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="password"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="py-3 px-6 rounded btn bg-dark text-white text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </section>
  );
}

export default LoginForm;
