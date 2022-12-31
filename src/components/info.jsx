import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Info() {
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [transferAmount, setTransferAmount] = useState(0);

  const transfer_coin = () => {
    if (transferFrom == 1 && transferTo == 2) {
      Axios.post('http://localhost:3001/api/transfer_coin_from_player1', {
        transfer_amount: transferAmount,
      }).then(response => {
        console.log(response);
      });
      alert('Transfer Successful');
    } else if (transferFrom == 2 && transferTo == 1) {
      Axios.post('http://localhost:3001/api/transfer_coin_from_player2', {
        transfer_amount: transferAmount,
      }).then(response => {
        console.log(response);
      });
      alert('Transfer Successful');
    } else {
      console.log('Invalid Transfer');
      alert('Transfer Failed');
    }
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
      p={14}
    >
      <Center>
        <Text fontSize="6xl" fontWeight="bold" mt="10">
          Transfer Coins
        </Text>
      </Center>
      <Stack direction="row" spacing={4} mt="10" alignItems={'center'}>
        <Text fontSize="2xl" fontWeight="bold" w={'20%'}>
          Transfer From
        </Text>
        <Select
          placeholder="Select Player"
          onChange={e => setTransferFrom(e.target.value)}
        >
          <option value="1">Red Car</option>
          <option value="2">Blue Car</option>
        </Select>
      </Stack>
      <Stack direction="row" spacing={4} mt="10" alignItems={'center'}>
        <Text fontSize="2xl" fontWeight="bold" w={'20%'}>
          Transfer To
        </Text>
        <Select
          placeholder="Select Player"
          onChange={e => setTransferTo(e.target.value)}
        >
          <option value="1">Red Car</option>
          <option value="2">Blue Car</option>
        </Select>
      </Stack>

      <Stack direction="row" spacing={4} mt="10" alignItems={'center'}>
        <Text fontSize="2xl" fontWeight="bold" w={'20%'}>
          Transfer Amount
        </Text>
        <Input
          type="number"
          placeholder="Enter Coins Amount"
          _placeholder={{ color: 'yellow.500' }}
          onChange={e => setTransferAmount(e.target.value)}
        ></Input>
      </Stack>
      <Center mt="10">
        <Button onClick={transfer_coin}>Transfer</Button>
      </Center>
    </Box>
  );
}
