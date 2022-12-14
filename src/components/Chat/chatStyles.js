import styled from 'styled-components';

const sizes = {
  borderWidth: '3px',
};

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  left: 100vh;

  position: absolute;
  top: 30vh;
  width: calc(100vw - 100vh - 2 * ${sizes.borderWidth});
`;
