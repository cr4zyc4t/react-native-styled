# React Native Styled

Inspired by [styled-component](https://styled-components.com/), but please to use in React Native.

- Extremely lightweight, no overhead, just like using React Native object style
- Easy to access global theme
- Isolate style logic from component logic
- Typescript intellisense fully supported 😀
- React Native Web support

# Installation

```
npm install @cr4zyc4t/native-styled
```

- Or use yarn instead

```
yarn add @cr4zyc4t/native-styled
```

# Basic

- Create styled component

```jsx
import { View, Text } from "react-native";
import styled from "@cr4zyc4t/native-styled";

const StyledView = styled(View)({
  backgroundColor: "green",
  marginTop: (props) => props.top, // custom styling props
  marginBottom: (props) => props.$bottom, // custom props start with $ will not be passed down to View component
  padding: (props) => props.theme.spacing.medium, // access global theme
});

const StyledText = styled(Text)(
  {
    color: "black",
  },
  {
    marginTop: 10,
  } // you can define as many style object as you want
);
```

- Then use it

```js
<StyledView top={4}>
```

# Global theme (optional)
Wraper your app in *ThemeProvider* and provide it a default theme value
```js
import { ThemeProvider } from "@cr4zyc4t/native-styled";

export default function App() {
  return (
    <ThemeProvider defaultTheme={theme}>
      <MainApp />
    </ThemeProvider>
  );
}
```

Then you can access global theme and change it using hooks

```js
import { useTheme, useThemeSetter } from "@cr4zyc4t/native-styled";

function ComponentWithTheme() {
  const theme = useTheme();
  const setTheme = useThemeSetter();

  return (
    <Button
      style={{ backgroundColor: theme.backgroundColor }}
      onPress={() => setTheme(awesomeTheme)}
    />
  );
}
```

# Typescript

_DefaultTheme_ is being used as an interface of props.theme out of the box. By default the interface DefaultTheme is empty so that's why we need to extend it.

```tsx
import "@cr4zyc4t/native-styled";

declare module "@cr4zyc4t/native-styled" {
  export interface DefaultTheme {
    borderRadius: number;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

then

```tsx
import { DefaultTheme } from "@cr4zyc4t/native-styled";

const theme: DefaultTheme = {
  borderRadius: 10;

  colors: {
    main: "red";
    secondary: "greeen";
  };
};
```

There is a **NOTE** when using custom props in typescript that you need to separate static style and custom style to avoid typescript assertion

```tsx
const StyledView = styled(View)<{ top: number }>(
  {
    backgroundColor: "green",
  },
  {
    marginTop: (props) => props.top,
    padding: (props) => props.theme.spacing.medium,
  }
);
```

## License

Licensed under the [MIT](LICENSE) License.
