import React from 'react';
import Message from './Message';
import { MessagesContainer } from './messagesStyles';

const Messages = ({ messages, name }) => (
  <MessagesContainer>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </MessagesContainer>
);

export default Messages;
