import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Text,
  Container,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Flex,
  Spacer,
  Center,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Avatar,
} from '@chakra-ui/react';
import Axios from 'axios';

import { FiSend } from 'react-icons/fi';
// import {CiCalendarDate} from 'react-icons/ci'

function InputMSG({ personName, placeholder }) {
  const [chat, setChat] = useState({
    person: personName,
    message: '',
  });
  const [isInvalidMsg, setIsInvalidMsg] = useState(false);
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
  return (
    <Flex as={'form'} width={['100%', '100%', '50%']} onSubmit={onSubmit}>
      <InputGroup>
        <Input
          name="message"
          isInvalid={isInvalidMsg}
          onChange={handleInput}
          focusBorderColor={personName === 'car1' ? 'red.200' : 'blue.200'}
          bgGradient={
            personName === 'car1'
              ? 'linear(to-r, red.100, red.300)'
              : 'linear(to-r, blue.100, blue.300)'
          }
          errorBorderColor="yellow.300"
          type="text"
          placeholder={placeholder}
          required
        />
        <InputRightElement>
          <IconButton
            size="md"
            fontSize="lg"
            color="white"
            variant="ghost"
            type="submit"
            icon={<FiSend size="20" />}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default function Chat() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get_chat').then(response => {
      setChatList(response.data);
    });
  }, []);

  const showDate = index => {
    if (index === 0) {
      return (
        <HStack spacing={4} marginTop={4}>
          <Tag size={'lg'} key={index} variant="outline" colorScheme="yellow">
            <TagLabel>{chatList[index].time.split('T')[0]}</TagLabel>
          </Tag>
        </HStack>
      );
    } else if (
      chatList[index - 1] &&
      chatList[index - 1].time.split('T')[0] !=
        chatList[index].time.split('T')[0]
    ) {
      return (
        <HStack spacing={4} marginTop={4}>
          <Tag size={'lg'} key={index} variant="outline" colorScheme="yellow">
            <TagLabel>{chatList[index].time.split('T')[0]}</TagLabel>
          </Tag>
        </HStack>
      );
    }
  };

  return (
    <Container maxW="container.xl" mt={4} p={4}>
      <Heading as="h1" size="2xl" mb={4}>
        Players Chat
      </Heading>
      <Box
        height="calc(90vh - 64px - 64px - 2rem)"
        overflowY="scroll"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        marginBottom={4}
        ref={el => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {chatList.map((val, key) => {
          return (
            <Stack spacing={4}>
              <Center>{showDate(key)}</Center>
              {val.person === 'car1' ? (
                <Tag size="lg" colorScheme="red" borderRadius="full">
                  <Avatar size="xs" name="Red Car" ml={-2} mr={2} />
                  <TagLabel>{val.message}</TagLabel>
                </Tag>
              ) : (
                <Tag size="lg" colorScheme="blue" borderRadius="full">
                  <Avatar size="xs" name="Blue Car" ml={-2} mr={2} />
                  <TagLabel>{val.message}</TagLabel>
                </Tag>
              )}
            </Stack>
          );
        })}
      </Box>
      <Stack spacing={4} direction={['column', 'column', 'row']}>
        <InputMSG personName={'car1'} placeholder={'Enter Red Car MSG'} />
        <Spacer />
        <InputMSG personName={'car2'} placeholder={'Enter Blue Car MSG'} />
      </Stack>
    </Container>
  );
}
