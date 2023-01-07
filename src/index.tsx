import { createContext, useContext } from "react";
import mapValues from "lodash.mapvalues";
import { ComponentType } from "react";
import { StyleProp } from "react-native";
import omitBy from "lodash.omitby";

const hasFuncStyle = (styles: Record<string, any>[]) =>
  styles.some((style) =>
    Object.values(style).some((v) => typeof v === "function")
  );

const filterStyleProps = <P extends {}>(props: P) =>
  omitBy(props, (_, k) => k.startsWith("$")) as P;

export interface DefaultTheme {}

export const ThemeContext = createContext<DefaultTheme>({});
export const ThemeProvider = ThemeContext.Provider;
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
