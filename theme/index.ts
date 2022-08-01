import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#606060', // things like text
    secondary: '#7A7A7A', // things like icon color
    tertiary: '#EBEBEB', // things like white ish background required colors
  },
});

export default theme;
