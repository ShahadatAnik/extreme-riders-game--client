import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/index';
import { Suspense } from 'react';
import Info from './components/info';
import { Loader } from './theme/Loader';
import NotFoundPage from './utill/NotFoundPage';
import Chat from './components/chatTemplate';
function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher
        justifySelf="flex-end"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: '9999',
        }}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
          <Route
            path="/info"
            element={
              <Suspense fallback={<Loader />}>
                <Info />
              </Suspense>
            }
          />
          <Route
            path="/chat"
            element={
              <Suspense fallback={<Loader />}>
                <Chat />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
