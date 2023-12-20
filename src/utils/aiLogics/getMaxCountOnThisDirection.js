/* eslint-disable complexity */

import { BOARD_SIZE, DIRECTIONS } from '../constants';

function isExistingPoint(pointAttempt, existingPoints) {
  return existingPoints.some(
    (existingPoint) =>
      existingPoint.xIndex === pointAttempt.xIndex && existingPoint.yIndex === pointAttempt.yIndex
  );
}

function updateXIndex(point, value) {
  return { ...point, xIndex: value };
}

function updateYIndex(point, value) {
  return { ...point, yIndex: value };
}

function updateXYIndex(point, xValue, yValue) {
  return { ...point, xIndex: xValue, yIndex: yValue };
}

export const getMaxCountOnThisDirection = (pointAttempt, existingPositions, direction, count) => {
  let counter = count;
  const x = pointAttempt.xIndex;
  const y = pointAttempt.yIndex;

  let currentX = pointAttempt.xIndex;
  let currentY = pointAttempt.yIndex;

  switch (direction) {
    case DIRECTIONS.HORIZONTAL: {
      while (
        currentX >= 0 &&
        !isExistingPoint(updateXIndex(pointAttempt, currentX - 1), existingPositions)
      ) {
        counter += 1;
        currentX -= 1;
      }
      currentX = x;
      while (
        currentX <= BOARD_SIZE.MAX_X &&
        !isExistingPoint(updateXIndex(pointAttempt, currentX + 1), existingPositions) &&
        counter < 6
      ) {
        counter += 1;
        currentX += 1;
      }

      break;
    }
    case DIRECTIONS.VERTICAL: {
      while (
        currentY >= 0 &&
        !isExistingPoint(updateYIndex(pointAttempt, currentY - 1), existingPositions)
      ) {
        counter += 1;
        currentY -= 1;
      }
      currentY = x;
      while (
        currentY <= BOARD_SIZE.MAX_Y &&
        !isExistingPoint(updateYIndex(pointAttempt, currentY + 1), existingPositions) &&
        counter < 6
      ) {
        counter += 1;
        currentY += 1;
      }

      break;
    }
    case DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT: {
      while (
        currentX >= 0 &&
        currentY >= 0 &&
        !isExistingPoint(updateXYIndex(pointAttempt, currentX - 1, currentY - 1), existingPositions)
      ) {
        counter += 1;
        currentX -= 1;
        currentY -= 1;
      }
      currentX = x;
      currentY = y;
      while (
        currentX < BOARD_SIZE.MAX_X &&
        currentY < BOARD_SIZE.MAX_Y &&
        !isExistingPoint(
          updateXYIndex(pointAttempt, currentX + 1, currentY + 1),
          existingPositions
        ) &&
        counter < 6
      ) {
        counter += 1;
        currentX += 1;
        currentY += 1;
      }
      break;
    }
    case DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT: {
      while (
        currentX >= 0 &&
        currentY < BOARD_SIZE.MAX_Y &&
        !isExistingPoint(updateXYIndex(pointAttempt, currentX - 1, currentY + 1), existingPositions)
      ) {
        counter += 1;
        currentX -= 1;
        currentY += 1;
      }
      currentX = x;
      currentY = y;
      while (
        currentX < BOARD_SIZE.MAX_X &&
        currentY >= 0 &&
        !isExistingPoint(
          updateXYIndex(pointAttempt, currentX + 1, currentY - 1),
          existingPositions
        ) &&
        counter < 6
      ) {
        counter += 1;
        currentX += 1;
        currentY -= 1;
      }
      break;
    }
    default: {
      break;
    }
  }

  return counter;
};
