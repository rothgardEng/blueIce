"use client";
import { useFormStatus } from "react-dom";

export default function LoadingBtn({ btnText, loadingText }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn2 anw-btn-no-margin font-text btn bg-dark text-white text-lg py-2 px-4 answer-yes cursor-pointer"
      type="submit"
      disabled={pending}
    >
      {pending ? loadingText : btnText}
    </button>
  );
}
