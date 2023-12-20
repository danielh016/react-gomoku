/* eslint-disable complexity */
const analysisBestPoint = (mySecondAnalysisResults, yourSecondAnalysisResults) => {
  if (mySecondAnalysisResults.length !== 0) {
    if (mySecondAnalysisResults.length === 1) {
      return mySecondAnalysisResults[0].position;
    }
    for (let i = 0; i < yourSecondAnalysisResults.length; i += 1) {
      const yourResult = yourSecondAnalysisResults[i];
      const commonBestPoint = mySecondAnalysisResults.find(
        (myResult) =>
          myResult.position.xIndex === yourResult.position.xIndex &&
          myResult.position.yIndex === yourResult.position.yIndex
      );
      if (commonBestPoint) {
        return commonBestPoint.position;
      }
    }
    return mySecondAnalysisResults[0].position;
  }

  return null;
};

const getBestPoint = (analysisResults) => {
  let bestPoint = analysisBestPoint(
    analysisResults.computerDouble3Alives,
    analysisResults.humanSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.computer3Alives,
    analysisResults.humanSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.humanDouble3Alives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.human3Alives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.computerDouble2Alives,
    analysisResults.humanSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.computer2Alives,
    analysisResults.humanSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.computer3HalfAlives,
    analysisResults.humanSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.human4HalfAlives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.humanDouble2Alives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.human2Alives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  bestPoint = analysisBestPoint(
    analysisResults.human3HalfAlives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) return bestPoint;

  return null;
};

export const applyThirdAnalysis = (analysisResults) => {
  if (analysisResults.computer4HalfAlives.length !== 0) {
    return analysisResults.computer4HalfAlives[0].position;
  }

  let bestPoint = analysisBestPoint(
    analysisResults.human4Alives,
    analysisResults.computerSecondResults
  );
  if (bestPoint) {
    return bestPoint;
  }

  bestPoint = getBestPoint(analysisResults);
  if (bestPoint) {
    return bestPoint;
  }

  return analysisResults.computerSecondResults[0].position;
};
