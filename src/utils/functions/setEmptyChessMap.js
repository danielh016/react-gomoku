import { CHESS_TYPES } from '../constants';

const setEmptyChessMap = () => {
  const chessMap = [];
  for (let x = 0; x < 15; x += 1) {
    for (let y = 0; y < 15; y += 1) {
      chessMap.push({
        xIndex: x.toString(),
        yIndex: y.toString(),
        chessType: CHESS_TYPES.EMPTY,
      });
    }
  }
  return chessMap;
};

export default setEmptyChessMap;
