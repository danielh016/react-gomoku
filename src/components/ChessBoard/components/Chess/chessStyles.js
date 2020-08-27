import styled from 'styled-components';
import { colors } from '../../../../utils/styleVars';
import { CHESS_TYPES } from '../../../../utils/constants';
import cross from '../../../../imgs/Cross.png';

export const ChessContainer = styled.div`
  align-items: center;
  background-image: url(${cross});
  background-position: center;
  display: flex;
  height: calc(100vh / 15);
  justify-content: center;
  left: calc(100vh / 15 * ${(props) => props.xIndex});
  position: absolute;
  top: calc(100vh / 15 * ${(props) => props.yIndex});
  width: calc(100vh / 15);
  z-index: 1;
`;

export const BlackChess = styled.div`
  background-color: ${colors.black};
  border-radius: 100%;
  height: 70%;
  width: 70%;
`;

export const WhiteChess = styled.div`
  background-color: ${colors.white};
  border-radius: 100%;
  height: 70%;
  width: 70%;
`;

export const EmptyGrid = styled.div`
  border-color: ${(props) => (props.chessTurn === CHESS_TYPES.BLACK ? colors.black : colors.white)};
  border-style: ${(props) => (props.mouseHovered && !props.hasWon ? 'solid' : 'none')};
  height: 100%;
  width: 100%;
`;
