import { createContext, useContext } from "react";

export interface DefaultTheme {}

const ThemeContext = createContext<DefaultTheme>({});
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);
