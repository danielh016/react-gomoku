/* eslint-disable complexity */
import { ALIVE_STATES } from '../constants';

/* eslint-disable no-restricted-syntax */
export const applySecondHumanAnalysis = (firstResultMap, analysisResults) => {
  let secondResultsInstance = null;

  for (const key of firstResultMap.keys()) {
    secondResultsInstance = {
      alive4: 0,
      alive3: 0,
      halfAlive4: 0,
      halfAlive3: 0,
      alive2: 0,
      position: key,
    };
    const firstResults = firstResultMap.get(key);

    for (let i = 0; i < firstResults.length; i += 1) {
      const result = firstResults[i];
      if (result.count === 4) {
        if (result.aliveState === ALIVE_STATES.ALIVE) {
          analysisResults.human4Alives.push(secondResultsInstance);
        } else {
          secondResultsInstance.halfAlive4 += 1;
          analysisResults.human4HalfAlives.push(secondResultsInstance);
        }
      } else if (result.count === 3) {
        if (result.aliveState === ALIVE_STATES.ALIVE) {
          secondResultsInstance.alive3 += 1;
          if (secondResultsInstance.alive3 === 1) {
            analysisResults.human3Alives.push(secondResultsInstance);
          } else {
            analysisResults.humanDouble3Alives.push(secondResultsInstance);
          }
        } else {
          secondResultsInstance.halfAlive3 += 1;
          analysisResults.human3HalfAlives.push(secondResultsInstance);
        }
      } else {
        secondResultsInstance.alive2 += 1;
        if (secondResultsInstance.alive2 === 1) {
          analysisResults.human2Alives.push(secondResultsInstance);
        }
        analysisResults.humanDouble2Alives.push(secondResultsInstance);
      }
    }

    analysisResults.humanSecondResults.push(secondResultsInstance);
  }

  return null;
};
