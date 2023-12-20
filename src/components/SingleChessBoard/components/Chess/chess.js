import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChessContainer, BlackChess, WhiteChess, EmptyGrid } from './chessStyles';
import { CHESS_TYPES } from '../../../../utils/constants';
import { reverseChessTurn } from '../../../../utils/functions';

const Chess = ({ chessType, chessTurn, xIndex, yIndex, hasWon, setChessOrder, setChessTurn }) => {
  const [mouseHovered, setMouseHovered] = useState(false);

  const mouseHover = () => {
    setMouseHovered(!mouseHovered);
  };

  const handleChessClicked = () => {
    setChessOrder((prevState) => [
      ...prevState,
      { xIndex: `${xIndex}`, yIndex: `${yIndex}`, chessType: chessTurn },
    ]);
    reverseChessTurn(setChessTurn);
  };

  const renderChessType = (type) => {
    switch (type) {
      case CHESS_TYPES.BLACK:
        return <BlackChess />;
      case CHESS_TYPES.WHITE:
        return <WhiteChess />;
      case CHESS_TYPES.EMPTY:
        return (
          <EmptyGrid
            onMouseEnter={mouseHover}
            onMouseLeave={mouseHover}
            mouseHovered={mouseHovered}
            hasWon={hasWon}
            chessTurn={chessTurn}
            onClick={hasWon ? () => {} : handleChessClicked}
          />
        );
      default:
        return <EmptyGrid />;
    }
  };

  return (
    <ChessContainer xIndex={xIndex} yIndex={yIndex}>
      {renderChessType(chessType)}
    </ChessContainer>
  );
};

Chess.propTypes = {
  chessType: PropTypes.string,
  chessTurn: PropTypes.string.isRequired,
  xIndex: PropTypes.string.isRequired,
  yIndex: PropTypes.string.isRequired,
  hasWon: PropTypes.bool.isRequired,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

Chess.defaultProps = {
  chessType: 'empty',
};

export default Chess;
