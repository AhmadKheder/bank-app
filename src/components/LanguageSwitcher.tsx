"use client";

import { setLanguage } from "@/store/slices/languageSlice";
import { RootState } from "@/store/store";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(setLanguage(currentLanguage));
    i18n.changeLanguage(currentLanguage);
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
      <Button
        className="text-white bg-blue-500 p-2 rounded-lg"
        onClick={() => dispatch(setLanguage("en"))}
      >
        En
      </Button>
      <Button
        className="text-white bg-blue-500 p-2 rounded-lg"
        onClick={() => dispatch(setLanguage("fr"))}
        variant="default"
      >
        FR
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
