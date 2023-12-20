/* eslint-disable complexity */
import { ALIVE_STATES } from '../constants';

/* eslint-disable no-restricted-syntax */
export const applySecondComputerAnalysis = (firstResultMap, analysisResults) => {
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
          return result.point;
        }
        secondResultsInstance.alive4 += 1;
        analysisResults.computer4HalfAlives.push(secondResultsInstance);
      } else if (result.count === 3) {
        if (result.aliveState === ALIVE_STATES.ALIVE) {
          secondResultsInstance.alive3 += 1;
          if (secondResultsInstance.alive3 === 1) {
            analysisResults.computer3Alives.push(secondResultsInstance);
          } else {
            analysisResults.computerDouble3Alives.push(secondResultsInstance);
          }
        } else {
          secondResultsInstance.halfAlive3 += 1;
          analysisResults.computer3HalfAlives.push(secondResultsInstance);
        }
      } else {
        secondResultsInstance.alive2 += 1;
        if (secondResultsInstance.alive2 === 1) {
          analysisResults.computer2Alives.push(secondResultsInstance);
        }
        analysisResults.computerDouble2Alives.push(secondResultsInstance);
      }
    }

    analysisResults.computerSecondResults.push(secondResultsInstance);
  }

  return null;
};
