/* eslint-disable react/prop-types */
import React from 'react';

const UserTyping = ({ userTyping, name }) => {
  const trimmedName = name.trim().toLowerCase();
  let isCurrentUser = false;

  if (userTyping.user === trimmedName) {
    isCurrentUser = true;
  }

  if (userTyping.status && !isCurrentUser) {
    return <>{userTyping.user} is typing...</>;
  }
  return <></>;
};

export default UserTyping;
