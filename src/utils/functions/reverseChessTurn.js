import { CHESS_TYPES } from '../constants';

const reverseChessTurn = (setChessTurn) => {
  setChessTurn((prevState) => {
    if (prevState === CHESS_TYPES.BLACK) {
      setChessTurn(CHESS_TYPES.WHITE);
    }
    if (prevState === CHESS_TYPES.WHITE) {
      setChessTurn(CHESS_TYPES.BLACK);
    }
  });
};

export default reverseChessTurn;
