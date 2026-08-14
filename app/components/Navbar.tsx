"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Navbar"); 

  return (
    <nav className="z-50">
      <div className="bg-white opacity-95 h-20 flex justify-around items-center px-4 md:px-10 lg:px-20  z-50">
      <h1 className="text-orange-500 italic text-3xl"><span className="text-black">kABOOSS</span> GYM</h1>

        <div 
          className="md:hidden text-black cursor-pointer"
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-label={t("menuToggle")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " ) {
              setMenuOpen(!isMenuOpen);
            }
          }}>
          <span className="text-2xl z-50">&#9776;</span>
        </div>

        <ul id="mobile-menu" className={`${isMenuOpen ? "block" : "hidden"} absolute md:static top-20 left-0 w-full flex flex-col md:flex-row items-center md:w-auto bg-white md:bg-transparent md:flex text-black gap-5 lg:gap-10 p-4 md:p-0 abs z-50 text-right shadow-lg md:shadow-none`}>
          <li className="py-1 md:py-0 mt-1 sm:mt-0 z-50 transition hover:text-orange-500">
            <Link href="/" onClick={() => setMenuOpen(false)}>{t("home")}</Link>
          </li>
          <li className="py-1 md:py-0 mt-1 sm:mt-0 z-50 transition hover:text-orange-500">
            <Link href="/about"  prefetch={true}  onClick={() => setMenuOpen(false)}>{t("about")}</Link>
          </li>
          <li className="py-1 md:py-0 mt-1 sm:mt-0 z-50 transition hover:text-orange-500">
            <Link href="/service" prefetch={true} onClick={() => setMenuOpen(false)}>{t("services")}</Link>
          </li>
          <li className="py-1 md:py-0 mt-1 sm:mt-0 z-50 transition hover:text-orange-500">
            <Link href="/workout" prefetch={true} onClick={() => setMenuOpen(false)}>{t("workout")}</Link>
          </li>
          <Link href="/log" prefetch={true} className="md:ml-10 border-2 border-solid border-orange-500 p-1 text-center w-32 rounded-full transition text-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => setMenuOpen(false)}>{t("login")}</Link>
          <Link href="/sign" prefetch={true} className="border-2 border-solid border-orange-500 p-1 text-center w-32 rounded-full transition hover:bg-orange-500 hover:text-white" onClick={() => setMenuOpen(false)}>{t("signup")}</Link>

          <Link href="/log" prefetch={true}>
            <FontAwesomeIcon
              icon={faUser}
              className="w-6 h-6 text-orange-500 transform transition duration-300 hover:scale-150 animate-bounceLight"
              onClick={() => setMenuOpen(false)}
            />
          </Link>
          <LocaleSwitcher />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;