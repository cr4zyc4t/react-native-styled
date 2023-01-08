import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ComponentType } from "react";
import { StyleProp } from "react-native";

const mapValues = (
  value: Record<string, any>,
  mapper: (v: any, k: string) => any
) => {
  const result: Record<string, any> = {};
  Object.keys(value).forEach((k) => {
    result[k] = mapper(k, value[k]);
  });
  return result;
};

const omitBy = (
  value: Record<string, any>,
  checker: (v: any, k: string) => boolean
) => {
  const result: Record<string, any> = {};
  Object.keys(value).forEach((k) => {
    if (checker(k, value[k])) {
      return;
    }
    result[k] = value[k];
  });
  return result;
};

const hasFuncStyle = (styles: Record<string, any>[]) =>
  styles.some((style) =>
    Object.values(style).some((v) => typeof v === "function")
  );

const filterStyleProps = <P extends {}>(props: P) =>
  omitBy(props, (_, k) => k.startsWith("$")) as P;

export interface DefaultTheme {}

export const ThemeContext = createContext<DefaultTheme>({});
const ThemeDispatchContext = createContext<
  Dispatch<SetStateAction<DefaultTheme>>
>(() => {});

interface ThemeProviderProps {
  defaultTheme: DefaultTheme;
  children: ReactNode;
}
export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState(props.defaultTheme);
  return (
    <ThemeDispatchContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};
export const useThemeSetter = () => useContext(ThemeDispatchContext);
export const useTheme = () => useContext(ThemeContext);

type FuncStyle<P extends {}> = Record<
  string,
  (props: P & { theme: DefaultTheme }) => any
>;
const styled =
  <P extends { style?: StyleProp<any> }>(Component: ComponentType<P>) =>
  <SP extends {}>(...styles: (P["style"] | FuncStyle<P & SP>)[]) =>
    hasFuncStyle(styles)
      ? (props: P & SP) => {
          const theme = useTheme();
          const computedStyles = styles.map((style) =>
            mapValues(style, (v) =>
              typeof v === "function" ? v({ ...props, theme }) : v
            )
          );

          return (
            <Component
              {...filterStyleProps(props)}
              style={[...computedStyles, props.style]}
            />
          );
        }
      : (props: P & SP) => (
          <Component
            {...filterStyleProps(props)}
            style={[...styles, props.style]}
          />
        );

export default styled;
