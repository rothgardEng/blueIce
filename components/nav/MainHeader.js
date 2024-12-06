"use client";
import HamButton from "./HamButton";
import classes from "./hamButton.module.css";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/src/i18n/routing";
import LocaleSwitcher from "./languageSelect/LocaleSwitcher";
import Image from "next/image";

export default function MainHeader() {
  const path = usePathname();
  const t = useTranslations("Nav");
  return (
    <header id="title">
      <nav className="bg-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 font-header">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className={`flex items-center`}>
            <Image
              src="/images/piggy.png"
              alt="piggy"
              width={24} // Set desired width
              height={24} // Set desired height
              className="piggyLogoNav mr-2"
            />
            <span
              className={`${
                classes.nav
              } text-xl font-semibold whitespace-nowrap dark:text-white ${
                path === "/" ? classes.active : undefined
              }`}
            >
              Defund NOVA Police
            </span>
          </Link>
          <LocaleSwitcher />

          <HamButton />
        </div>
      </nav>
    </header>
  );
}
