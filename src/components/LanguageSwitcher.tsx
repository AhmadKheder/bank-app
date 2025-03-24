"use client";

import { setLanguage } from "@/store/slices/languageSlice";
import { RootState } from "@/store/store";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  // Local state to avoid hydration issues
  const [clientLanguage, setClientLanguage] = useState(i18n.language);

  useEffect(() => {
    // Sync with Redux state after mount
    setClientLanguage(currentLanguage);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang)); // Update Redux state
    i18n.changeLanguage(lang); // Update i18n instance
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <br />
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
};

export default LanguageSwitcher;
