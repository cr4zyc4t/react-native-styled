import mapValues from "lodash.mapvalues";
import { ComponentType } from "react";
import { DefaultTheme, useTheme } from "./context";
import { filterStyleProps, hasFuncStyle } from "./utils";

type FuncStyle<Props extends {}> = Record<
  string,
  (props: Props & { theme: DefaultTheme }) => any
>;

const styled =
  <Props extends { style?: S } = {}, S extends {} = {}>(
    Component: ComponentType<Props>
  ) =>
  <ExtraProps extends {}>(
    ...styles: (Props["style"] | FuncStyle<Props & ExtraProps>)[]
  ) =>
    hasFuncStyle(styles)
      ? (props: Props & ExtraProps) => {
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
      : (props: Props & ExtraProps) => (
          <Component
            {...filterStyleProps(props)}
            style={[...styles, props.style]}
          />
        );

export default styled;
