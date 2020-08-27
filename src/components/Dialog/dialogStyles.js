import styled from 'styled-components';
import { colors } from '../../utils/styleVars';

const sizes = {
  borderWidth: '3px',
};

export const DialogContainer = styled.div`
  align-items: center;
  border-style: solid;
  border-color: ${colors.black};
  border-width: ${sizes.borderWidth};
  display: flex;
  flex-direction: column;
  height: 30vh;
  justify-content: center;
  left: 100vh;
  position: absolute;
  top: 0;
  width: calc(100vw - 100vh - 2 * ${sizes.borderWidth});
`;

export const VictoryMessage = styled.div`
  color: ${colors.black};
  font-size: 1.6rem;
  font-weight: 300;
  margin: 1vh;
  text-align: center;
`;

export const ResetButton = styled.button`
  border-style: none;
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: 1.6rem;
  padding: 1vh;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;
