import React, { useEffect, useState } from 'react';
import { ChatContainer } from './chatStyles';
import Input from './components/Input';
import Messages from './components/Messages';
import UserTyping from './components/UserTyping';

const Chat = ({ name, socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState({});

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      socket.on('typing', ({ user, status }) => {
        setUserTyping({ user, status });
      });
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  let timeout;

  const handleTypingTimeout = () => {
    socket.emit('typing', { status: false });
  };

  const handleKeyDown = () => {
    socket.emit('typing', { status: true });
    clearTimeout(timeout);
    timeout = setTimeout(handleTypingTimeout, 5000);
  };

  return (
    <ChatContainer>
      <Messages messages={messages} name={name} />
      <UserTyping userTyping={userTyping} name={name} />
      <Input
        message={message}
        onKeyDown={handleKeyDown}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatContainer>
  );
};

export default Chat;
