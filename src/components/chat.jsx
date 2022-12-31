import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Text,
  Container,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
} from '@chakra-ui/react';
import Axios from 'axios';

import { FiSend } from 'react-icons/fi';

export default function Chat({personName, placeholder}) {
  const [chat, setChat] = useState({
    person: personName,
    message: '',
  });
  const [isInvalidMsg, setIsInvalidMsg] = useState(false);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get_chat').then(response => {
      setChatList(response.data);
    });
  }, []);

  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'message') {
      if (value.length < 1) {
        setIsInvalidMsg(true);
      } else {
        setIsInvalidMsg(false);
      }
    }
    setChat(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    if (isInvalidMsg) {
      e.preventDefault();
    } else {
      Axios.post('http://localhost:3001/api/insert_chat', {
        person: chat.person,
        message: chat.message,
      });
    }
  };

  const showDate = index => {
    if (
      chatList[index - 1] &&
      chatList[index - 1].time.split('T')[0] !=
        chatList[index].time.split('T')[0]
    ) {
      return (
        <Text ml="auto" fontSize="xs" color="gray.500" fontWeight="bold">
          {chatList[index].time.split('T')[0]}
        </Text>
      );
    }
  };

  return (


      <Container maxW="container.xl" mt={10}>
        <Stack spacing={4}>
          {chatList.map((val, key) => {
            return (
              <Box key={key}>
                {showDate(key)}
                <Flex>
                  <Text fontWeight="bold" mr={2}>
                    {val.person}:
                  </Text>
                  <Text>{val.message}</Text>
                </Flex>
              </Box>
            );
          })}
        </Stack>
      </Container>
  );
}
