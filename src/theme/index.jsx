import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// mode('light', 'dark')(props)

const styles = {
  global: props => ({
    body: {
      color: mode('yellow.600', 'yellow.200')(props),
      bg: mode('white', 'black')(props),
    },
  }),
};

const components = {
  Drawer: {
    baseStyle: props => ({
      dialog: {
        bg: mode('white', 'black')(props),
      },
    }),
  },
};

const theme = extendTheme({
  config,
  components,
  styles,
  fonts: {
    heading: ['Roboto', 'Hind Siliguri'], // <-- this is the font family
    
  },
});

export default theme;
