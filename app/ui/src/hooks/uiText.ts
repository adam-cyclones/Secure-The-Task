import { useContext } from "react";
import { LangContext } from "../contexts/languageContext";

export const useUiText = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useUiText must be used within a LangProvider");
  }
  return context;
};
