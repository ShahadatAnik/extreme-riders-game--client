import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index';
import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import React, { useEffect, useState } from "react";
import Axios from 'axios'

import car1_up from './asset/car1up.png';
import car1_down from './asset/car1down.png';
import car1_left from './asset/car1left.png';
import car1_right from './asset/car1right.png';
import car2_up from './asset/car2up.png';
import car2_down from './asset/car2down.png';
import car2_left from './asset/car2left.png';
import car2_right from './asset/car2right.png';
import coin_png from './asset/coin.png';
import { useMemo } from 'react';


function App() {

  const [initialXoffset, setInnitialXoffset] = useState()
  const [initialYoffset, setInnitialYoffset] = useState()

  const [initialXoffset2, setInnitialXoffset2] = useState()
  const [initialYoffset2, setInnitialYoffset2] = useState()

    fetch('http://localhost:3001/api/get_car_1/')
    .then((resp) => resp.json())
    .then((resp) => (setInnitialXoffset(resp[0]?.x_axis), setInnitialYoffset(resp[0]?.y_axis)))
    .catch((error) => console.log(error));

    fetch('http://localhost:3001/api/get_car_2/')
    .then((resp) => resp.json())
    .then((resp) => (setInnitialXoffset2(resp[0]?.x_axis), setInnitialYoffset2(resp[0]?.y_axis)))
    .catch((error) => console.log(error));


  const [xoffset, setXoffset] = useState(0);
  const [yoffset, setYoffset] = useState(0);
  const [xoffset2, setXoffset2] = useState(900);
  const [yoffset2, setYoffset2] = useState(700);
  const [delta, setDelta] = useState(20);
  const [car1, setCar1] = useState(car1_up);
  const [car2, setCar2] = useState(car2_up);
  const [coin, setCoin] = useState(coin_png);
  const [coin_x, setCoin_x] = useState(500);
  const [coin_y, setCoin_y] = useState(500);
  const [car1_axis, setCar1_axis] = useState();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [car_1_point, setCar_1_point] = useState(0);
  const [car_2_point, setCar_2_point] = useState(0);

  if(initialXoffset!= undefined){
    if(count==0 ){
      setXoffset(initialXoffset)
      setYoffset(initialYoffset)
      setCount(1)
    }
  }

  if(initialXoffset2!= undefined){
    if(count2==0 ){
      setXoffset2(initialXoffset2)
      setYoffset2(initialYoffset2)
      setCount2(1)
    }
  }

  useEffect(() => {

    for(var x=0; x<200; x=x+1){
      for(var y=0; y<200; y=y+1){
        if((xoffset+x)==coin_x && (yoffset+y)==coin_y){
          setCoin_x(Math.floor(Math.random() * (window.innerWidth-150)));
          setCoin_y(Math.floor(Math.random() * (window.innerHeight-150)));
          setCar_1_point(car_1_point+1);
        }
      }
    }

   
    
    //console.log(car1_axis)
    const handleCar1 = (event) => {
      if (event.keyCode === 87) {
        //W
        if(yoffset>0){
          setCar1(car1_up);
          setYoffset(yoffset-delta);
          update_car_1();
        }
        else{
          setYoffset(window.innerHeight-250);
        }
      }
      if (event.keyCode === 65) {
        //A
        if(xoffset>0){
          setCar1(car1_left);
          setXoffset(xoffset-delta);
          update_car_1();
        }
        else{
          setXoffset(window.innerWidth-250);
        }
      }
      if (event.keyCode === 83) {
        //S
        if(yoffset<window.innerHeight-250){
          setCar1(car1_down);
          setYoffset(yoffset+delta);
          update_car_1();
        }
        else{
          setYoffset(0);
        }
      }
      if (event.keyCode === 68) {
        //D
        if(xoffset<window.innerWidth-250){
          setCar1(car1_right);
          setXoffset(xoffset+delta);
          update_car_1();
        }
        else{
          setXoffset(0);
        }
      }
    };
    

    window.addEventListener('keydown', handleCar1);
    return () => {
      window.removeEventListener('keydown', handleCar1);
    };

  }, [xoffset, yoffset]);


  useEffect(() => {
    for(var x=0; x<200; x=x+1){
      for(var y=0; y<200; y=y+1){
        if((xoffset2+x)==coin_x && (yoffset2+y)==coin_y){
          setCoin_x(Math.floor(Math.random() * (window.innerWidth-150)));
          setCoin_y(Math.floor(Math.random() * (window.innerHeight-150)));
          setCar_2_point(car_2_point+1);
        }
      }
    }

    const handleCar2 = (event) => {
      if (event.keyCode === 38) {
        if(yoffset2<0){
          setYoffset2((window.innerHeight-250));
        }
        else{
          setCar2(car2_up);
          setYoffset2(yoffset2-delta);
          update_car_2();
        }
      }
      if (event.keyCode === 37) {
        if(xoffset2>0){
          setCar2(car2_left);
          setXoffset2(xoffset2-delta);
          update_car_2();
        }
        else{
          setXoffset2((window.innerWidth-250));
        }
      }
      if (event.keyCode === 40) {
        if(yoffset2<window.innerHeight-250){
          setCar2(car2_down);
          setYoffset2(yoffset2+delta);
          update_car_2();
        }
        else{
          setYoffset2(0);
        }
      }
      if (event.keyCode === 39) {
        if(xoffset2<window.innerWidth-250){
          setCar2(car2_right);
          setXoffset2(xoffset2+delta);
          update_car_2();
        }
        else{
          setXoffset2(0);
        }
      }
    };

    
    window.addEventListener('keydown', handleCar2);
    return () => {
      window.removeEventListener('keydown', handleCar2);
    };
  }, [xoffset2, yoffset2]);

  const update_car_1 = () =>{
    Axios.post("http://localhost:3001/api/update_car_1/", {
      x_axis: xoffset,
      y_axis: yoffset,
    });
  };

  const update_car_2 = () =>{
    Axios.post("http://localhost:3001/api/update_car_2/", {
      x_axis: xoffset2,
      y_axis: yoffset2,
    });
  };

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
      <h1>Car 1 point: {car_1_point}</h1>
      <h1>Car 2 point: {car_2_point}</h1>
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

    <h2
		style={{
			position: "absolute",
			left: `${coin_x}px`,
			top: `${coin_y}px`,
		}}
		>
		<img src={coin} height="100" width="100" alt='coin'/>
		</h2>
    </ChakraProvider>
  );
}

export default App;
