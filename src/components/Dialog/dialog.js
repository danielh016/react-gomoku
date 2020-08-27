import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, VictoryMessage, ResetButton } from './dialogStyles';

const Dialog = ({ firstTurnColor, chessTypeHasWon, setChessOrder, setChessTurn }) => {
  const handleReset = () => {
    setChessOrder([]);
    setChessTurn(firstTurnColor);
  };

  return (
    <DialogContainer>
      {chessTypeHasWon && <VictoryMessage>{`${chessTypeHasWon} has won`}</VictoryMessage>}
      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </DialogContainer>
  );
  // Timer
};

Dialog.propTypes = {
  firstTurnColor: PropTypes.string.isRequired,
  chessTypeHasWon: PropTypes.string,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  chessTypeHasWon: '',
};

export default Dialog;
