/* eslint-disable no-continue */
/* eslint-disable complexity */

import { ALIVE_STATES, COUNT_DIRECTION, DIRECTIONS } from '../constants';
import { countPoints } from './countPoints';
import { getMaxCountOnThisDirection } from './getMaxCountOnThisDirection';

const tryAndCalculateResult = (
  myExistingPositions,
  opponentExistingPositions,
  computerPointAttempt,
  direction
) => {
  let firstAnalysisResult = {};

  const maxCountOnThisDirection = getMaxCountOnThisDirection(
    computerPointAttempt,
    opponentExistingPositions,
    direction,
    1
  );

  if (maxCountOnThisDirection < 5) {
    return null;
  }
  if (maxCountOnThisDirection === 5) {
    firstAnalysisResult = {
      count: 1,
      point: computerPointAttempt,
      direction,
      aliveState: ALIVE_STATES.HALF_ALIVE,
    };
  } else {
    firstAnalysisResult = {
      count: 1,
      point: computerPointAttempt,
      direction,
      aliveState: ALIVE_STATES.ALIVE,
    };
  }

  firstAnalysisResult = countPoints(
    myExistingPositions,
    opponentExistingPositions,
    computerPointAttempt,
    firstAnalysisResult,
    direction,
    COUNT_DIRECTION.FORWARD
  );
  firstAnalysisResult = countPoints(
    myExistingPositions,
    opponentExistingPositions,
    computerPointAttempt,
    firstAnalysisResult,
    direction,
    COUNT_DIRECTION.BACKWARD
  );

  if (
    firstAnalysisResult.count <= 1 ||
    (firstAnalysisResult.count === 2 && firstAnalysisResult.aliveState === ALIVE_STATES.HALF_ALIVE)
  ) {
    return null;
  }

  return firstAnalysisResult;
};

const addToFirstAnalysisResult = (firstAnalysisResult, firstResultMap) => {
  const { point } = firstAnalysisResult;

  if (firstResultMap.has(point)) {
    firstResultMap.get(point).push(firstAnalysisResult);
  } else {
    const list = [firstAnalysisResult];
    firstResultMap.set(point, list);
  }
};

export const applyFirstAnalysis = (
  computerExistingPositions,
  humanExistingPositions,
  allEmptyPoints,
  range,
  computerFirstResultMap,
  humanFirstResultMap
) => {
  let computerPointAttempt = null;
  let humanPointAttempt = null;
  let x;
  let y;
  let firstAnalysisResult;

  for (let i = 0; i < allEmptyPoints.length; i += 1) {
    computerPointAttempt = allEmptyPoints[i];
    x = computerPointAttempt.xIndex;
    y = computerPointAttempt.yIndex;

    if (x < range.rangeMinX || x > range.rangeMaxX || y < range.rangeMinY || y > range.rangeMaxY) {
      continue;
    }

    firstAnalysisResult = tryAndCalculateResult(
      computerExistingPositions,
      humanExistingPositions,
      computerPointAttempt,
      DIRECTIONS.HORIZONTAL
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        return computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, computerFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      computerExistingPositions,
      humanExistingPositions,
      computerPointAttempt,
      DIRECTIONS.VERTICAL
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        return computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, computerFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      computerExistingPositions,
      humanExistingPositions,
      computerPointAttempt,
      DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        return computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, computerFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      computerExistingPositions,
      humanExistingPositions,
      computerPointAttempt,
      DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        return computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, computerFirstResultMap);
    }

    // opposite direction of anaylsis, human side
    firstAnalysisResult = tryAndCalculateResult(
      humanExistingPositions,
      computerExistingPositions,
      computerPointAttempt,
      DIRECTIONS.HORIZONTAL
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        humanPointAttempt = computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, humanFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      humanExistingPositions,
      computerExistingPositions,
      computerPointAttempt,
      DIRECTIONS.VERTICAL
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        humanPointAttempt = computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, humanFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      humanExistingPositions,
      computerExistingPositions,
      computerPointAttempt,
      DIRECTIONS.DIAGONAL_TOPLEFT_BOTTOMRIGHT
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        humanPointAttempt = computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, humanFirstResultMap);
    }

    firstAnalysisResult = tryAndCalculateResult(
      humanExistingPositions,
      computerExistingPositions,
      computerPointAttempt,
      DIRECTIONS.DIAGONAL_TOPRIGHT_BOTTOMLEFT
    );
    computerPointAttempt.xIndex = x;
    computerPointAttempt.yIndex = y;
    if (firstAnalysisResult !== null) {
      if (firstAnalysisResult.count === 5) {
        humanPointAttempt = computerPointAttempt;
      }
      addToFirstAnalysisResult(firstAnalysisResult, humanFirstResultMap);
    }
  }

  return humanPointAttempt;
};
