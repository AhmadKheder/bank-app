"use client";

import i18n from "@/i18n";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

type Props = { children: ReactNode };

const TranslationProvider = ({ children }: Props) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationProvider;
