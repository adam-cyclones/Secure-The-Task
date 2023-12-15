/**
 * @file This file contains context for language as in i18n translation of UI text
 */

import React, { createContext, ReactNode } from "react";
import { UIText } from "../types/Language.types";

export const LangContext = createContext<UIText | undefined>(undefined);

interface TextProviderProps {
  children: ReactNode;
  text: UIText;
}

export const LangProvider = ({ children, text }: TextProviderProps) => {
  return <LangContext.Provider value={text}>{children}</LangContext.Provider>;
};
