"use client";
import { useEffect } from "react";
import { Link } from "@/src/i18n/routing";
import classes from "./hamButton.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LogOutButton from "../auth/LogOutButton";
import { useLocale, useTranslations } from "next-intl";

export default function HamButton() {
  const path = usePathname();
  const { data: session, status } = useSession();
  const t = useTranslations("Nav");
  const locale = useLocale();

  let hamMenu;
  useEffect(() => {
    const hamButton = document.querySelector('[data-collapse-toggle="ham"]');
    hamMenu = document.getElementById("ham");

    const toggleMenu = () => {
      hamMenu.classList.toggle("hidden");
    };

    hamButton.addEventListener("click", toggleMenu);

    return () => {
      hamButton.removeEventListener("click", toggleMenu);
    };
  }, [session, path]);

  const hideHam = () => {
    hamMenu.classList.toggle("hidden");
  };

  return (
    <>
      <button
        data-collapse-toggle="ham"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="ham"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div className="hidden w-full lg:block lg:w-auto" id="ham">
        <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium">
          <li className="flex items-center">
            <Link
              href="/call"
              onClick={hideHam}
              className={`${
                classes.nav
              } block py-3 px-3 text-gray-700 rounded lg:bg-transparent lg:text-gray-700 dark:text-gray-400 nav ${
                path.startsWith(`/${locale}/call`) ? classes.active : undefined
              }`}
            >
              {t("Nav_call")}
            </Link>
          </li>

          <li className="flex items-center">
            <Link
              href="/news"
              onClick={hideHam}
              className={`${
                classes.nav
              } block py-3 px-3 text-gray-700 rounded lg:bg-transparent lg:text-gray-700 dark:text-gray-400 ${
                path.startsWith(`/${locale}/news`) ? classes.active : undefined
              }`}
            >
              {t("Nav_news")}
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href="/recs"
              onClick={hideHam}
              className={`${
                classes.nav
              } block py-3 px-3 text-gray-700 rounded lg:bg-transparent lg:text-gray-700 dark:text-gray-400 ${
                path.startsWith(`/${locale}/recs`) ? classes.active : undefined
              }`}
            >
              {t("Nav_recs")}
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href="/united"
              onClick={hideHam}
              className={` ${
                classes.nav
              } block py-3 px-3 text-gray-700 rounded lg:bg-transparent lg:text-gray-700 dark:text-gray-400 ${
                path.startsWith(`/${locale}/united`)
                  ? classes.active
                  : undefined
              }`}
            >
              {t("Nav_our_coalition")}
            </Link>
          </li>
          <li className="flex items-center">
            {!session ? (
              <Link
                href="/joinus"
                className="block py-3 px-3  rounded
                    btn bg-dark text-white text-lg"
              >
                {t("Nav_join_us")}
              </Link>
            ) : (
              <LogOutButton />
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
