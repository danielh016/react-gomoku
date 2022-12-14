import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, VictoryMessage, ResetButton } from './dialogStyles';

const Dialog = ({ chessTypeHasWon, socket }) => {
  const handleReset = () => {
    socket.emit('resetChessMap');
  };

  const handleUndo = () => {
    socket.emit('undoChessAction');
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
};

Dialog.defaultProps = {
  chessTypeHasWon: '',
};

export default Dialog;
