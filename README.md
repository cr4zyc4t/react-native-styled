# React Native Styled

Inspired by [styled-component](https://styled-components.com/), but please to use in React Native.

- Extremely lightweight, no overhead, just like using React Native object style
- Easy to access global theme
- Isolate style logic from component logic
- Typescript intellisense fully supported 😀
- React Native Web support

# Installation

```
npm install react-native-styled
```

- Or use yarn instead

```
yarn add react-native-styled
```

# Basic

- Create styled component

```jsx
import { View, Text } from "react-native";
import styled from "react-native-styled";

const StyledView = styled(View)({
  backgroundColor: "green",
  marginTop: (props) => props.top, // custom styling props
  marginBottom: (props) => props.$bottom, // custom props starts with $ will not be passed down to View component
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

```js
import { ThemeProvider } from "react-native-styled";

export default function App() {
  return (
    <ThemeProvider value={theme}>
      <MainApp />
    </ThemeProvider>
  );
}
```

# Typescript

_DefaultTheme_ is being used as an interface of props.theme out of the box. By default the interface DefaultTheme is empty so that's why we need to extend it.

```tsx
declare module "react-native-styled" {
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
import { DefaultTheme } from "react-native-styled";

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
