import { ALIVE_STATES, BOARD_SIZE, COUNT_DIRECTION, DIRECTIONS } from '../constants';

/* eslint-disable complexity */
const pointToNext = (pointAttempt, direction, countDirection) => {
  const updatedPoint = { ...pointAttempt };
  switch (direction) {
    case DIRECTIONS.HORIZONTAL: {
      if (countDirection === COUNT_DIRECTION.FORWARD) {
        updatedPoint.xIndex += 1;
      } else {
        updatedPoint.xIndex -= 1;
      }
      return updatedPoint;
    }
    case DIRECTIONS.VERTICAL: {
      if (countDirection === COUNT_DIRECTION.FORWARD) {
        updatedPoint.yIndex += 1;
      } else {
        updatedPoint.yIndex -= 1;
      }
      return updatedPoint;
    }
    case DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT: {
      if (countDirection === COUNT_DIRECTION.FORWARD) {
        updatedPoint.xIndex += 1;
        updatedPoint.yIndex += 1;
      } else {
        updatedPoint.xIndex -= 1;
        updatedPoint.yIndex -= 1;
      }
      return updatedPoint;
    }
    case DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT: {
      if (countDirection === COUNT_DIRECTION.FORWARD) {
        updatedPoint.xIndex += 1;
        updatedPoint.yIndex -= 1;
      } else {
        updatedPoint.xIndex -= 1;
        updatedPoint.yIndex += 1;
      }
      return updatedPoint;
    }
    default: {
      break;
    }
  }

  return updatedPoint;
};

const isOutOfWall = (pointAttempt, direction) => {
  if (direction === DIRECTIONS.VERTICAL) {
    return pointAttempt.yIndex < BOARD_SIZE.MIN_Y || pointAttempt.yIndex >= BOARD_SIZE.MAX_Y;
  }
  if (direction === DIRECTIONS.HORIZONTAL) {
    return pointAttempt.xIndex < BOARD_SIZE.MIN_X || pointAttempt.xIndex >= BOARD_SIZE.MAX_X;
  }
  return (
    pointAttempt.xIndex < BOARD_SIZE.MIN_X ||
    pointAttempt.xIndex >= BOARD_SIZE.MAX_X ||
    pointAttempt.yIndex < BOARD_SIZE.MIN_Y ||
    pointAttempt.yIndex >= BOARD_SIZE.MAX_Y
  );
};

const checkIncludes = (existingPositions, nextPointAttempt) => {
  return existingPositions.some(
    (existingPosition) =>
      existingPosition.xIndex === nextPointAttempt.xIndex &&
      existingPosition.yIndex === nextPointAttempt.yIndex
  );
};

export const countPoints = (
  myExistingPositions,
  opponentExistingPositions,
  pointAttempt,
  firstAnalysisResult,
  direction,
  countDirection
) => {
  const updatedFirstAnalysisResult = firstAnalysisResult;
  let nextPointAttempt = pointToNext(pointAttempt, direction, countDirection);

  if (checkIncludes(myExistingPositions, nextPointAttempt)) {
    updatedFirstAnalysisResult.count += 1;
    nextPointAttempt = pointToNext(nextPointAttempt, direction, countDirection);

    if (checkIncludes(myExistingPositions, nextPointAttempt)) {
      updatedFirstAnalysisResult.count += 1;
      nextPointAttempt = pointToNext(nextPointAttempt, direction, countDirection);

      if (checkIncludes(myExistingPositions, nextPointAttempt)) {
        updatedFirstAnalysisResult.count += 1;
        nextPointAttempt = pointToNext(nextPointAttempt, direction, countDirection);

        if (checkIncludes(myExistingPositions, nextPointAttempt)) {
          updatedFirstAnalysisResult.count += 1;
          nextPointAttempt = pointToNext(nextPointAttempt, direction, countDirection);
        } else if (
          checkIncludes(opponentExistingPositions, nextPointAttempt) ||
          isOutOfWall(nextPointAttempt, direction)
        ) {
          updatedFirstAnalysisResult.aliveState = ALIVE_STATES.HALF_ALIVE;
        }
      } else if (
        checkIncludes(opponentExistingPositions, nextPointAttempt) ||
        isOutOfWall(nextPointAttempt, direction)
      ) {
        updatedFirstAnalysisResult.aliveState = ALIVE_STATES.HALF_ALIVE;
      }
    } else if (
      checkIncludes(opponentExistingPositions, nextPointAttempt) ||
      isOutOfWall(nextPointAttempt, direction)
    ) {
      updatedFirstAnalysisResult.aliveState = ALIVE_STATES.HALF_ALIVE;
    }
  } else if (
    checkIncludes(opponentExistingPositions, nextPointAttempt) ||
    isOutOfWall(nextPointAttempt, direction)
  ) {
    updatedFirstAnalysisResult.aliveState = ALIVE_STATES.HALF_ALIVE;
  }

  return updatedFirstAnalysisResult;
};
