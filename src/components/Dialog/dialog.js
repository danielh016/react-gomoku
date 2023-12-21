import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, VictoryMessage, ResetButton } from './dialogStyles';
import { reverseChessTurn } from '../../utils/functions';
import { getDefaultChessOrder, getFirstTurnColor } from '../../utils/constants';

const Dialog = ({ chessTypeHasWon, socket, isWhite, setChessOrder, setChessTurn }) => {
  const handleReset = () => {
    if (socket) {
      socket.emit('resetChessMap');
      return;
    }
    setChessOrder(getDefaultChessOrder(isWhite));
    setChessTurn(getFirstTurnColor(isWhite));
  };

  const handleUndo = () => {
    if (socket) {
      socket.emit('undoChessAction');
      return;
    }
    setChessOrder((prevState) => {
      prevState.pop();
      return [...prevState];
    });
    reverseChessTurn(setChessTurn);
  };

  return (
    <DialogContainer>
      {chessTypeHasWon && <VictoryMessage>{`${chessTypeHasWon} has won`}</VictoryMessage>}
      <ResetButton onClick={handleReset}>Reset</ResetButton>
      <ResetButton onClick={handleUndo}>Undo</ResetButton>
    </DialogContainer>
  );
  // Timer
};

Dialog.propTypes = {
  chessTypeHasWon: PropTypes.string,
  isWhite: PropTypes.bool.isRequired,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  chessTypeHasWon: '',
};

export default Dialog;
