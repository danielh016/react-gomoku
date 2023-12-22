export const CHESS_TYPES = {
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  EMPTY: 'EMPTY',
};

export const DIRECTIONS = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
  DIAGONAL_TOPLEFT_BOTTOMRIGHT: 'DIAGONAL_TOPLEFT_BOTTOMRIGHT',
  DIAGONAL_TOPRIGHT_BOTTOMLEFT: 'DIAGONAL_TOPRIGHT_BOTTOMLEFT',
};

export const ALIVE_STATES = {
  ALIVE: 'ALIVE',
  HALF_ALIVE: 'HALF_ALIVE',
};

export const BOARD_SIZE = {
  MIN_X: 0,
  MIN_Y: 0,
  MAX_X: 14,
  MAX_Y: 14,
};

export const COUNT_DIRECTION = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
};

export const getFirstTurnColor = (isWhite) => {
  return isWhite ? CHESS_TYPES.WHITE : CHESS_TYPES.BLACK;
};

export const getDefaultChessOrder = (isWhite) => {
  return isWhite ? [{ xIndex: '7', yIndex: '7', chessType: CHESS_TYPES.BLACK }] : [];
};
