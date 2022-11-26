import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import React, { useEffect, useState } from "react";
import car1_up from './asset/car1up.png';
import car1_down from './asset/car1down.png';
import car1_left from './asset/car1left.png';
import car1_right from './asset/car1right.png';
import car2_up from './asset/car2up.png';
import car2_down from './asset/car2down.png';
import car2_left from './asset/car2left.png';
import car2_right from './asset/car2right.png';


function App() {

  const [xoffset, setXoffset] = useState(500);
  const [yoffset, setYoffset] = useState(700);
  const [xoffset2, setXoffset2] = useState(900);
  const [yoffset2, setYoffset2] = useState(700);
  const [delta, setDelta] = useState(10);
  const [car1, setCar1] = useState(car1_up);
  const [car2, setCar2] = useState(car2_up);

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

      if (event.keyCode === 38) {
        setCar2(car2_up);
        setYoffset2(yoffset2-delta);
      }
      if (event.keyCode === 37) {
        setCar2(car2_left);
        setXoffset2(xoffset2-delta);
      }
      if (event.keyCode === 40) {
        setCar2(car2_down);
        setYoffset2(yoffset2+delta);
      }
      if (event.keyCode === 39) {
        setCar2(car2_right);
        setXoffset2(xoffset2+delta);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [xoffset, yoffset, xoffset2, yoffset2]);

  
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
		<img src={car1} height="250" width="250" alt='car_1'/>
		</h2>

    <h2
		style={{
			position: "absolute",
			left: `${xoffset2}px`,
			top: `${yoffset2}px`,
		}}
		>
		<img src={car2} height="250" width="250" alt='car_1'/>
		</h2>
    </ChakraProvider>
  );
}

export default App;
