import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  useDisclosure,
  Flex,
  Box,
  Text,
  Spacer,
  Center,
  Button,
  Image,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import car1_up from '../asset/car1up.png';
import car1_down from '../asset/car1down.png';
import car1_left from '../asset/car1left.png';
import car1_right from '../asset/car1right.png';
import car2_up from '../asset/car2up.png';
import car2_down from '../asset/car2down.png';
import car2_left from '../asset/car2left.png';
import car2_right from '../asset/car2right.png';
import coin_png from '../asset/coin.png';

function Index() {
  // Alert
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Game
  const [initialXoffset, setInnitialXoffset] = useState();
  const [initialYoffset, setInnitialYoffset] = useState();

  const [initialXoffset2, setInnitialXoffset2] = useState();
  const [initialYoffset2, setInnitialYoffset2] = useState();

  const [initialCar1Point, setInnitialCar1Point] = useState();
  const [initialCar2Point, setInnitialCar2Point] = useState();

  const [initialCar1Win, setInnitialCar1Win] = useState();
  const [initialCar2Win, setInnitialCar2Win] = useState();

  fetch('http://localhost:3001/api/get_car_1/')
    .then(resp => resp.json())
    .then(
      resp => (
        setInnitialXoffset(resp[0]?.x_axis), setInnitialYoffset(resp[0]?.y_axis)
      )
    )
    .catch(error => console.log(error));

  fetch('http://localhost:3001/api/get_car_2/')
    .then(resp => resp.json())
    .then(
      resp => (
        setInnitialXoffset2(resp[0]?.x_axis),
        setInnitialYoffset2(resp[0]?.y_axis)
      )
    )
    .catch(error => console.log(error));

  fetch('http://localhost:3001/api/get_coins_earned/')
    .then(resp => resp.json())
    .then(
      resp => (
        setInnitialCar1Point(resp[0]?.player1_coins),
        setInnitialCar2Point(resp[0]?.player2_coins)
      )
    )
    .catch(error => console.log(error));

  fetch('http://localhost:3001/api/get_total_wins/')
    .then(resp => resp.json())
    .then(
      resp => (
        setInnitialCar1Win(resp[0]?.player1_win),
        setInnitialCar2Win(resp[0]?.player2_win)
      )
    )
    .catch(error => console.log(error));

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
  const [time_second, setTime_second] = useState(0);
  const [time_minute, setTime_minute] = useState(0);
  const [time_pause, setTime_pause] = useState(false);
  const [Game_over, setGame_over] = useState(false);
  const [timeToPlay, setTimeToPlay] = useState(1);
  const [alert_show, setAlert_show] = useState(false);
  const [alert_message, setAlert_message] = useState('');
  const [car1_total_coin, setCar1_total_coin] = useState(0);
  const [car2_total_coin, setCar2_total_coin] = useState(0);
  const [car1_Total_win, setCar1_Total_win] = useState(0);
  const [car2_Total_win, setCar2_Total_win] = useState(0);

  if (initialCar1Win != undefined) {
    if (count == 0) {
      setInnitialCar1Win(initialCar1Win);
      console.log(initialCar1Win);
    }
  }

  if (initialCar2Win != undefined) {
    if (count2 == 0) {
      setInnitialCar2Win(initialCar2Win);
      console.log(initialCar2Win);
    }
  }

  if (initialXoffset != undefined) {
    if (count == 0) {
      setXoffset(initialXoffset);
      setYoffset(initialYoffset);
      setCount(1);
    }
  }

  if (initialXoffset2 != undefined) {
    if (count2 == 0) {
      setXoffset2(initialXoffset2);
      setYoffset2(initialYoffset2);
      setCount2(1);
    }
  }

  useEffect(() => {
        if ((xoffset+200 >= coin_x && xoffset <= coin_x)  && (yoffset + 200 >=coin_y && yoffset <= coin_y)){
          setCoin_x(Math.floor(Math.random() * (window.innerWidth - 150)));
          setCoin_y(Math.floor(Math.random() * (window.innerHeight - 150)));
          setCar_1_point(car_1_point + 1);
      }

    //console.log(car1_axis)
    const handleCar1 = event => {
      if (Game_over == false) {
        if (event.keyCode === 87) {
          //W
          if (yoffset > 0) {
            setCar1(car1_up);
            setYoffset(yoffset - delta);
            update_car_1();
          } else {
            setYoffset(window.innerHeight - 250);
          }
        }
        if (event.keyCode === 65) {
          //A
          if (xoffset > 0) {
            setCar1(car1_left);
            setXoffset(xoffset - delta);
            update_car_1();
          } else {
            setXoffset(window.innerWidth - 250);
          }
        }
        if (event.keyCode === 83) {
          //S
          if (yoffset < window.innerHeight - 250) {
            setCar1(car1_down);
            setYoffset(yoffset + delta);
            update_car_1();
          } else {
            setYoffset(0);
          }
        }
        if (event.keyCode === 68) {
          //D
          if (xoffset < window.innerWidth - 250) {
            setCar1(car1_right);
            setXoffset(xoffset + delta);
            update_car_1();
          } else {
            setXoffset(0);
          }
        }
      }
    };

    window.addEventListener('keydown', handleCar1);
    return () => {
      window.removeEventListener('keydown', handleCar1);
    };
  }, [xoffset, yoffset, Game_over]);

  useEffect(() => {
        if ((xoffset2+200 >= coin_x && xoffset2 <= coin_x)  && (yoffset2 + 200 >=coin_y && yoffset2 <= coin_y)) {
          setCoin_x(Math.floor(Math.random() * (window.innerWidth - 150)));
          setCoin_y(Math.floor(Math.random() * (window.innerHeight - 150)));
          setCar_2_point(car_2_point + 1);
    }

    const handleCar2 = event => {
      if (Game_over == false) {
        if (event.keyCode === 38) {
          if (yoffset2 < 0) {
            setYoffset2(window.innerHeight - 250);
          } else {
            setCar2(car2_up);
            setYoffset2(yoffset2 - delta);
            update_car_2();
          }
        }
        if (event.keyCode === 37) {
          if (xoffset2 > 0) {
            setCar2(car2_left);
            setXoffset2(xoffset2 - delta);
            update_car_2();
          } else {
            setXoffset2(window.innerWidth - 250);
          }
        }
        if (event.keyCode === 40) {
          if (yoffset2 < window.innerHeight - 250) {
            setCar2(car2_down);
            setYoffset2(yoffset2 + delta);
            update_car_2();
          } else {
            setYoffset2(0);
          }
        }
        if (event.keyCode === 39) {
          if (xoffset2 < window.innerWidth - 250) {
            setCar2(car2_right);
            setXoffset2(xoffset2 + delta);
            update_car_2();
          } else {
            setXoffset2(0);
          }
        }
      }
    };

    window.addEventListener('keydown', handleCar2);
    return () => {
      window.removeEventListener('keydown', handleCar2);
    };
  }, [xoffset2, yoffset2, Game_over]);

  useEffect(() => {
    if (time_pause === false) {
      setTimeout(() => {
        setTime_second(time_second + 1);
      }, 1000);
      if (time_second === 60) {
        setTime_minute(time_minute + 1);
        setTime_second(0);
      }
    }
    if (time_minute == timeToPlay && time_second == 0) {
      setGame_over(true);
      setTime_pause(true);
      if (car_1_point > car_2_point) {
        console.log('Red car Winner');
        setAlert_show(true);
        onOpen();
        setAlert_message('Red Car Winner');
        setInnitialCar1Win(initialCar1Win + 1);
        setInnitialCar1Point(car_1_point);
        setInnitialCar2Point(car_2_point);
        console.log(initialCar1Win);
        update_total_coin();
      } else if (car_1_point == car_2_point) {
        console.log('Draw');
        setAlert_show(true);
        onOpen();
        setAlert_message('Draw');
        setInnitialCar1Point(car_1_point);
        setInnitialCar2Point(car_2_point);
        update_total_coin();
      } else {
        console.log('Blue Car Winner');
        setAlert_show(true);
        onOpen();
        setAlert_message('Blue Car Winner');
        setInnitialCar2Win(initialCar2Win + 1);
        setInnitialCar1Point(car_1_point);
        setInnitialCar2Point(car_2_point);
        console.log(initialCar2Win);
        update_total_coin();
      }
    }
  }, [time_second, time_minute, time_pause]);

  const update_car_1 = () => {
    Axios.post('http://localhost:3001/api/update_car_1/', {
      x_axis: xoffset,
      y_axis: yoffset,
    });
  };

  const update_car_2 = () => {
    Axios.post('http://localhost:3001/api/update_car_2/', {
      x_axis: xoffset2,
      y_axis: yoffset2,
    });
  };

  const update_total_coin = () => {
    Axios.post('http://localhost:3001/api/update_total_coin/', {
      player1_coin: car_1_point,
      player2_coin: car_2_point,
    });
  };

  const reset = () => {
    setAlert_show(false);
    setGame_over(false);
    setTime_pause(false);
    setTime_minute(0);
    setTime_second(0);
    setCar_1_point(0);
    setCar_2_point(0);
  };

  const total_coin = () => {
    Axios.get('http://localhost:3001/api/get_total_coin').then(response => {
      setCar1_total_coin(response.data[0].player1_coin);
      setCar2_total_coin(response.data[0].player2_coin);
    });
  };

  const total_win = () => {
    Axios.get('http://localhost:3001/api/get_total_win').then(response => {
      setCar1_Total_win(response.data[0].player1_win);
      setCar2_Total_win(response.data[0].player2_win);
    });
  };

  return (
    <Box
      sx={{
        // background black to white gradient
        backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 5s ease infinite',
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        // not cover the full window
        minHeight: '100vh',
      }}
    >
      <Flex
        alignItems="center"
        gap={2}
        p={2}
        justifyContent="center"
        alignContent="center"
      >
        <Text
          mt={2}
          align={'left'}
          color={'white'}
          fontSize={['md', 'md', 'lg']}
          bgGradient="linear(to-r, #f83656, #f8a561)"
          rounded={'md'}
          p={2}
        >
          Red Car: {car_1_point}
        </Text>
        <Spacer />
        <Text
          mt={2}
          align={'left'}
          color={'white'}
          fontSize={['md', 'md', 'lg']}
          bgGradient="linear(to-r, #1e3c72, #2a5298)"
          rounded={'md'}
          p={2}
          sx={{
            backgroundImage: 'linear-gradient(90deg, #1e3c72, #f83656)',
            backgroundSize: '400% 400%',
            animation: 'gradient 5s ease infinite',
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% 50%',
              },
              '50%': {
                backgroundPosition: '100% 50%',
              },
              '100%': {
                backgroundPosition: '0% 50%',
              },
            },
          }}
        >
          {time_minute}m : {time_second}s
        </Text>
        <Spacer />
        <Text
          mt={2}
          align={'left'}
          color={'white'}
          fontSize={['md', 'md', 'lg']}
          bgGradient="linear(to-r, #1e3c72, #2a5298)"
          rounded={'md'}
          p={2}
        >
          Blue Car: {car_2_point}
        </Text>
      </Flex>

      {/* reset  */}

      <div
        style={{
          position: 'absolute',
          left: `${xoffset}px`,
          top: `${yoffset}px`,
        }}
      >
        <Image
          src={car1}
          height="250"
          width="250"
          alt="car_1"
          sx={{
            zIndex: '-1',
          }}
        />
      </div>
      <h2
        style={{
          position: 'absolute',
          left: `${xoffset2}px`,
          top: `${yoffset2}px`,
        }}
      >
        <Image
          src={car2}
          height="250"
          width="250"
          alt="car_1"
          sx={{
            zIndex: '-2',
          }}
        />
      </h2>
      <h2
        style={{
          position: 'absolute',
          left: `${coin_x}px`,
          top: `${coin_y}px`,
        }}
      >
        <Image
          src={coin}
          height="50"
          width="50"
          alt="coin"
          sx={{
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
            zIndex: '-3',
          }}
        />
      </h2>

      {/* alert  */}
      {alert_show == true && (
        <AlertDialog
          // leastDestructiveRef={cancelRef}
          // onClose={onClose}
          isOpen={isOpen}
          isCentered
          sx={{
            backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
            backgroundSize: '400% 400%',
            animation: 'gradient 5s ease infinite',
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% 50%',
              },
              '50%': {
                backgroundPosition: '100% 50%',
              },
              '100%': {
                backgroundPosition: '0% 50%',
              },
            },
          }}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize="4xl"
                fontWeight="bold"
                color="red.500"
              >
                <Center>Game Over</Center>
                {total_coin()}
                {total_win()}
              </AlertDialogHeader>
              <AlertDialogBody>
                <Center>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.500"
                    marginBottom={8}
                  >
                    {alert_message}
                  </Text>
                </Center>
                {/* a 3 by 3 table without border */}
                <Table variant="simple" color={'white'}>
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Wins</Th>
                      <Th>Coins</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      rounded={'md'}
                      sx={{
                        backgroundImage:
                          'linear-gradient(315deg, #f83656 0%, #f8a561 74%)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 5s ease infinite',
                        '@keyframes gradient': {
                          '0%': {
                            backgroundPosition: '0% 50%',
                          },
                          '50%': {
                            backgroundPosition: '100% 50%',
                          },
                          '100%': {
                            backgroundPosition: '0% 50%',
                          },
                        },
                      }}
                    >
                      <Td>Red Car</Td>
                      <Td>{car1_Total_win}</Td>
                      <Td>{car1_total_coin}</Td>
                    </Tr>
                    <Tr
                      bgGradient="linear(to-r, #1e3c72, #2a5298)"
                      sx={{
                        backgroundImage:
                          'linear-gradient(90deg, #1e3c72, #2a5298)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 5s ease infinite',
                        '@keyframes gradient': {
                          '0%': {
                            backgroundPosition: '0% 50%',
                          },
                          '50%': {
                            backgroundPosition: '100% 50%',
                          },
                          '100%': {
                            backgroundPosition: '0% 50%',
                          },
                        },
                      }}
                    >
                      <Td>Blue Car</Td>
                      <Td>{car2_Total_win}</Td>
                      <Td>{car2_total_coin}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AlertDialogBody>
              <Stack direction="row" spacing={4} p={4}>
                <Button
                  onClick={e => (window.location.href = '/info')}
                  colorScheme="green"
                  sx={{
                    backgroundImage:
                      'linear-gradient(315deg,#559e0b  0%, #0cf054 74%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 2s ease infinite',
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  Transfer Coin
                </Button>
                <Spacer />
                <Button
                  onClick={e => (window.location.href = '/chat')}
                  colorScheme="yellow"
                  sx={{
                    backgroundImage:
                      'linear-gradient(315deg, #eb9234 0%, #ebe134 74%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 2s ease infinite',
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  Chat
                </Button>
                <Spacer />
                <Button
                  onClick={e => reset()}
                  colorScheme="red"
                  sx={{
                    backgroundImage:
                      'linear-gradient(315deg, #eb3471 0%, #8f0404 74%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 2s ease infinite',
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Box>
  );
}

export default Index;
