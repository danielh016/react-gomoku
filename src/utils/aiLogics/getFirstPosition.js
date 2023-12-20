import { BOARD_SIZE } from '../constants';

export const getFirstPosition = (currentChess) => {
  if (
    currentChess.xIndex === BOARD_SIZE.MIN_X ||
    currentChess.yIndex === BOARD_SIZE.MIN_Y ||
    currentChess.xIndex === BOARD_SIZE.MAX_X ||
    currentChess.yIndex === BOARD_SIZE.MAX_Y
  ) {
    return {
      xIndex: `${BOARD_SIZE.MAX_X / 2}`,
      yIndex: `${BOARD_SIZE.MAX_Y / 2}`,
    };
  }
  const nextX = `${currentChess.xIndex - 1}`;
  const nextY = `${currentChess.yIndex}`;

  return {
    xIndex: nextX,
    yIndex: nextY,
  };
};
