import React from 'react';
import { Form, SendButton, StyledInput } from './inputStyles';

// TODO: use formik here
const Input = ({ onKeyDown, setMessage, sendMessage, message }) => (
  <Form>
    <StyledInput
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyDown={onKeyDown}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <SendButton onClick={(e) => sendMessage(e)}>Send</SendButton>
  </Form>
);

export default Input;
