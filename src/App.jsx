import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher
        justifySelf="flex-end"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: '9999',
        }}
      />
     <h1>extreme riders</h1>
    </ChakraProvider>
  );
}

export default App;
