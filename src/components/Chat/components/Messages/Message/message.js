/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBox, MessageContainer, MessageText, SentText } from './messageStyles';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <MessageContainer end>
      <SentText right>{trimmedName}</SentText>
      <MessageBox theme="dark">
        <MessageText theme="dark">{text}</MessageText>
      </MessageBox>
    </MessageContainer>
  ) : (
    <MessageContainer start>
      <MessageBox theme="light">
        <MessageText theme="light">{text}</MessageText>
      </MessageBox>
      <SentText left>{user}</SentText>
    </MessageContainer>
  );
};

export default Message;
