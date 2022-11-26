import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import React, { useEffect, useState } from "react";
import car1_up from './asset/car1up.png';
import car1_down from './asset/car1down.png';
import car1_left from './asset/car1left.png';
import car1_right from './asset/car1right.png';


function App() {

  const [xoffset, setXoffset] = useState(500);
  const [yoffset, setYoffset] = useState(700);
  const [delta, setDelta] = useState(10);
  const [car1, setCar1] = useState(car1_up);

  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 87) {
        setCar1(car1_up);
        setYoffset(yoffset-delta);
      }
      if (event.keyCode === 65) {
        setCar1(car1_left);
        setXoffset(xoffset-delta);
      }
      if (event.keyCode === 83) {
        setCar1(car1_down);
        setYoffset(yoffset+delta);
      }
      if (event.keyCode === 68) {
        setCar1(car1_right);
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
		<img src={car1} height="250" width="250"/>
		</h2>
    </ChakraProvider>
  );
}

export default App;
