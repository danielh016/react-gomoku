import React from 'react';
import PropTypes from 'prop-types';
import { Chess } from './components';
import { ChessBoardContainer } from './chessBoardStyles';

const ChessBoard = ({ chessMap, chessTurn, hasWon, setChessOrder, setChessTurn }) => {
  return (
    <ChessBoardContainer>
      {chessMap.map((chess) => (
        <Chess
          key={`${chess.chessType}-${chess.xIndex}-${chess.yIndex}`}
          chessType={chess.chessType}
          chessTurn={chessTurn}
          xIndex={chess.xIndex}
          yIndex={chess.yIndex}
          hasWon={hasWon}
          setChessOrder={setChessOrder}
          setChessTurn={setChessTurn}
        />
      ))}
    </ChessBoardContainer>
  );
};

ChessBoard.propTypes = {
  chessMap: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  chessTurn: PropTypes.string.isRequired,
  hasWon: PropTypes.bool.isRequired,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

export default ChessBoard;
