"use client";
import { useTransition } from "react";
import { usePathname, useRouter } from "../../../src/i18n/routing";

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className={`relative text-gray-400`}>
      <p className="sr-only ">{label}</p>
      <select
        className={`inline-flex appearance-none bg-transparent py-3 pl-2 pr-6 cursor-pointer`}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
