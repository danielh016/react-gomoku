import styled from 'styled-components';
import { colors } from '../../utils/styleVars';

// eslint-disable-next-line import/prefer-default-export
export const ChessBoardContainer = styled.div`
  background-color: ${colors.chessboardBrown};
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vh;
  z-index: 0;
`;
