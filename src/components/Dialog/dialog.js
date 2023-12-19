import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, VictoryMessage, ResetButton } from './dialogStyles';
import { reverseChessTurn } from '../../utils/functions';

const Dialog = ({ chessTypeHasWon, socket, firstTurnColor, setChessOrder, setChessTurn }) => {
  const handleReset = () => {
    if (socket) {
      socket.emit('resetChessMap');
      return;
    }
    setChessOrder([]);
    setChessTurn(firstTurnColor);
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
  firstTurnColor: PropTypes.string.isRequired,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  chessTypeHasWon: '',
};

export default Dialog;
