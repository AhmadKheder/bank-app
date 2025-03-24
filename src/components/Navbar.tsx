"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Bank <span className="text-blue-500">ERS</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            {t("Home")}
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            {t("Dashboard")}
          </Link>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
