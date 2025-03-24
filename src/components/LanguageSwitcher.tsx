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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en"; // ✅ Load saved language
    console.log({ storedLang });
    dispatch(setLanguage(storedLang));
    i18n.changeLanguage(storedLang);
    setIsInitialized(true);
  }, [dispatch, currentLanguage]);

  useEffect(() => {
    if (isInitialized) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, isInitialized]);

  if (!isInitialized) {
    return <p className="text-white bg-blue-500 p-2 rounded">Loading...</p>;
  }

  return (
    <div className="flex gap-2">
      <button
        className="text-white bg-blue-500 p-2 rounded"
        onClick={() => dispatch(setLanguage("en"))}
      >
        English
      </button>
      <button
        className="text-white bg-blue-500 p-2 rounded"
        onClick={() => dispatch(setLanguage("fr"))}
      >
        Français
      </button>
    </div>
  );
};

export default LanguageSwitcher;
