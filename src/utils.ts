import omitBy from "lodash.omitby";

export const hasFuncStyle = (styles: Record<string, any>[]) =>
  styles.some((style) =>
    Object.values(style).some((v) => typeof v === "function")
  );

export const filterStyleProps = <P extends {}>(props: P) =>
  omitBy(props, (_, k) => k.startsWith("$")) as P;
