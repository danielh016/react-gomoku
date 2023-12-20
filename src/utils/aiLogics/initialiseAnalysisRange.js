import { BOARD_SIZE } from '../constants';

export const initialiseAnalysisRange = (chessOrder) => {
  const ANAYSIS_RANGE = 1;
  const currentRange = {
    rangeMinX: 0,
    rangeMinY: 0,
    rangeMaxX: 0,
    rangeMaxY: 0,
  };
  currentRange.rangeMinX = chessOrder[0].xIndex - ANAYSIS_RANGE;
  currentRange.rangeMinY = chessOrder[0].yIndex - ANAYSIS_RANGE;
  currentRange.rangeMaxX = chessOrder[0].xIndex + ANAYSIS_RANGE;
  currentRange.rangeMaxY = chessOrder[0].yIndex + ANAYSIS_RANGE;

  chessOrder.forEach((chess) => {
    if (chess.xIndex - ANAYSIS_RANGE < currentRange.rangeMinX) {
      currentRange.rangeMinX = chess.xIndex - ANAYSIS_RANGE;
    }
    if (chess.yIndex - ANAYSIS_RANGE < currentRange.rangeMinY) {
      currentRange.rangeMinY = chess.yIndex - ANAYSIS_RANGE;
    }
    if (chess.xIndex + ANAYSIS_RANGE > currentRange.rangeMaxX) {
      currentRange.rangeMaxX = chess.xIndex + ANAYSIS_RANGE;
    }
    if (chess.yIndex + ANAYSIS_RANGE > currentRange.rangeMaxY) {
      currentRange.rangeMaxY = chess.yIndex + ANAYSIS_RANGE;
    }
  });

  currentRange.rangeMinX =
    currentRange.rangeMinX < BOARD_SIZE.MIN_X ? BOARD_SIZE.MIN_X : currentRange.rangeMinX;
  currentRange.rangeMinY =
    currentRange.rangeMinY < BOARD_SIZE.MIN_Y ? BOARD_SIZE.MIN_Y : currentRange.rangeMinY;
  currentRange.rangeMaxX =
    currentRange.rangeMaxX > BOARD_SIZE.MAX_X ? BOARD_SIZE.MAX_X : currentRange.rangeMaxX;
  currentRange.rangeMaxY =
    currentRange.rangeMaxY > BOARD_SIZE.MAX_Y ? BOARD_SIZE.MAX_Y : currentRange.rangeMaxY;
  return currentRange;
};
