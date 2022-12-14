import { DIRECTIONS } from '../constants';

const getChessNextToCurrent = (currentChess, chessOrder, direction) => {
  let chessNextToCurrent = null;

  switch (direction) {
    case DIRECTIONS.HORIZONTAL: {
      chessNextToCurrent = chessOrder.find(
        (otherChess) =>
          parseInt(otherChess.xIndex, 10) === parseInt(currentChess.xIndex, 10) + 1 &&
          parseInt(otherChess.yIndex, 10) === parseInt(currentChess.yIndex, 10)
      );
      break;
    }
    case DIRECTIONS.VERTICAL: {
      chessNextToCurrent = chessOrder.find(
        (otherChess) =>
          parseInt(otherChess.xIndex, 10) === parseInt(currentChess.xIndex, 10) &&
          parseInt(otherChess.yIndex, 10) === parseInt(currentChess.yIndex, 10) + 1
      );
      break;
    }
    case DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT: {
      chessNextToCurrent = chessOrder.find(
        (otherChess) =>
          parseInt(otherChess.xIndex, 10) === parseInt(currentChess.xIndex, 10) + 1 &&
          parseInt(otherChess.yIndex, 10) === parseInt(currentChess.yIndex, 10) + 1
      );
      break;
    }
    case DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT: {
      chessNextToCurrent = chessOrder.find(
        (otherChess) =>
          parseInt(otherChess.xIndex, 10) === parseInt(currentChess.xIndex, 10) + 1 &&
          parseInt(otherChess.yIndex, 10) === parseInt(currentChess.yIndex, 10) - 1
      );
      break;
    }
    default:
  }

  return chessNextToCurrent;
};

const checkHasWonWithDirection = (
  currentChess,
  chessOrder,
  direction,
  numberOfSameTypeInARow = 1
) => {
  let updatedNumberOfSameTypeInARow = numberOfSameTypeInARow;

  const chessNextToCurrent = getChessNextToCurrent(currentChess, chessOrder, direction);

  if (!chessNextToCurrent) return false;

  const WINNING_CONDITION_NUMBER = 5;

  if (chessNextToCurrent.chessType === currentChess.chessType) {
    updatedNumberOfSameTypeInARow += 1;
    const reachWinningCondition = updatedNumberOfSameTypeInARow === WINNING_CONDITION_NUMBER;

    if (reachWinningCondition) return true;
    return checkHasWonWithDirection(
      chessNextToCurrent,
      chessOrder,
      direction,
      updatedNumberOfSameTypeInARow
    );
  }

  return false;
};

const getWinningChessType = (chessOrder) => {
  const hasWonConditionList = chessOrder.map((currentChess) => {
    const hasWon =
      checkHasWonWithDirection(currentChess, chessOrder, DIRECTIONS.HORIZONTAL) ||
      checkHasWonWithDirection(currentChess, chessOrder, DIRECTIONS.VERTICAL) ||
      checkHasWonWithDirection(currentChess, chessOrder, DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT) ||
      checkHasWonWithDirection(currentChess, chessOrder, DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT);
    if (hasWon) {
      return currentChess.chessType;
    }
    return null;
  });

  const chessTypeHasWon = hasWonConditionList.find((condition) => condition !== null);
  return chessTypeHasWon;
};

export default getWinningChessType;
