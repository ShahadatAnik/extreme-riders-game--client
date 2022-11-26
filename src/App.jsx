import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import React, { useEffect, useState } from "react";
import car from './asset/car.png';


function App() {

  const [xoffset, setXoffset] = useState(500);
  const [yoffset, setYoffset] = useState(700);
  const [delta, setDelta] = useState(10);

  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 87) {
        setYoffset(yoffset-delta);
      }
      if (event.keyCode === 65) {
        setXoffset(xoffset-delta);
      }
      if (event.keyCode === 83) {
        setYoffset(yoffset+delta);
      }
      if (event.keyCode === 68) {
        setXoffset(xoffset+delta);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [xoffset, yoffset]);

  
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

     
     <h2
		style={{
			position: "absolute",
			left: `${xoffset}px`,
			top: `${yoffset}px`,
		}}
		>
		<img src={car} height="100" width="100"/>
		</h2>
    </ChakraProvider>
  );
}

export default App;
