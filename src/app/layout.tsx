"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Navbar } from "@/components/Navbar";
import "@/i18n"; // Import i18n config
import ReduxProvider from "@/store/provider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const [clientLang, setClientLang] = useState("en"); // Default lang

  useEffect(() => {
    setClientLang(i18n.language); // Ensure sync after hydration
  }, []);

  return (
    <html lang={clientLang}>
      <body className="bg-black max-2-2xl mx-auto p-4 lg:px-8">
        <ReduxProvider>
          <Navbar />
          <LanguageSwitcher />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
