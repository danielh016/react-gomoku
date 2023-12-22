/* eslint-disable no-continue */
/* eslint-disable complexity */
import { getFirstPosition } from '../aiLogics/getFirstPosition';
import { initialiseAnalysisRange } from '../aiLogics/initialiseAnalysisRange';
import { CHESS_TYPES } from '../constants';
import { applyFirstAnalysis } from '../aiLogics/applyFirstAnalysis';
import { applySecondComputerAnalysis } from '../aiLogics/applySecondComputerAnalysis';
import { applySecondHumanAnalysis } from '../aiLogics/applySecondHumanAnalysis';
import { applyThirdAnalysis } from '../aiLogics/applyThirdAnalysis';

const getAllEmptyPoints = (chessMap) => {
  return chessMap
    .filter((chess) => chess.chessType === CHESS_TYPES.EMPTY)
    .map((chess) => ({
      xIndex: parseInt(chess.xIndex, 10),
      yIndex: parseInt(chess.yIndex, 10),
    }));
};

let computerFirstResultMap = new Map();
let humanFirstResultMap = new Map();

const analysisResults = {};

const initAnalysisResult = () => {
  computerFirstResultMap = new Map();
  humanFirstResultMap = new Map();

  analysisResults.computerSecondResults = [];
  analysisResults.humanSecondResults = [];

  analysisResults.computer4HalfAlives = [];
  analysisResults.computerDouble3Alives = [];
  analysisResults.computer3Alives = [];
  analysisResults.computerDouble2Alives = [];
  analysisResults.computer2Alives = [];
  analysisResults.computer3HalfAlives = [];

  analysisResults.human4Alives = [];
  analysisResults.human4HalfAlives = [];
  analysisResults.humanDouble3Alives = [];
  analysisResults.human3Alives = [];
  analysisResults.humanDouble2Alives = [];
  analysisResults.human2Alives = [];
  analysisResults.human3HalfAlives = [];
};

const startAnalysis = (aiChessType, currentChess, chessOrder, chessMap) => {
  if (chessOrder.length === 1) {
    return getFirstPosition(currentChess);
  }

  // 1. initRange to search
  const range = initialiseAnalysisRange(chessOrder, chessMap);

  // 2. init analysis result
  initAnalysisResult();

  const allEmptyPoints = getAllEmptyPoints(chessMap);

  const humanChessType = aiChessType === CHESS_TYPES.BLACK ? CHESS_TYPES.WHITE : CHESS_TYPES.BLACK;
  const humanExistingPositions = chessOrder
    .filter((chess) => chess.chessType === humanChessType)
    .map((chess) => ({ xIndex: chess.xIndex, yIndex: chess.yIndex }));
  const computerExistingPositions = chessOrder
    .filter((chess) => chess.chessType === aiChessType)
    .map((chess) => ({ xIndex: chess.xIndex, yIndex: chess.yIndex }));

  // 3. start first analysis
  let bestPoint = applyFirstAnalysis(
    computerExistingPositions,
    humanExistingPositions,
    allEmptyPoints,
    range,
    computerFirstResultMap,
    humanFirstResultMap
  );
  if (bestPoint !== null) {
    console.log('This position is the most crucial, must be taken!');
    return bestPoint;
  }

  console.log('analysisResults before second round', analysisResults);

  // 4. start computer second analysis
  bestPoint = applySecondComputerAnalysis(computerFirstResultMap, analysisResults);
  if (bestPoint !== null) {
    console.log('Almost winning, must take this position');
    return bestPoint;
  }

  // 5. start human second analysis
  bestPoint = applySecondHumanAnalysis(humanFirstResultMap, analysisResults);
  if (bestPoint !== null) {
    console.log('Almost losing, must take this position');
    return bestPoint;
  }

  console.log('analysisResults before third round', analysisResults);

  // 6. start third analysis (final)
  return applyThirdAnalysis(analysisResults);
};

export const applyConditionalAiLogic = (chessOrder, chessMap) => {
  const parsedChessOrder = chessOrder.map((chess) => ({
    ...chess,
    xIndex: parseInt(chess.xIndex, 10),
    yIndex: parseInt(chess.yIndex, 10),
  }));
  const currentChess = parsedChessOrder[parsedChessOrder.length - 1];
  const aiChessType =
    currentChess.chessType === CHESS_TYPES.BLACK ? CHESS_TYPES.WHITE : CHESS_TYPES.BLACK;

  const nextPosition = startAnalysis(aiChessType, currentChess, parsedChessOrder, chessMap);

  return {
    xIndex: `${nextPosition.xIndex}`,
    yIndex: `${nextPosition.yIndex}`,
    chessType: aiChessType,
  };
};
