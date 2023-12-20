import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chess } from './components';
import { ChessBoardContainer } from './chessBoardStyles';
import { applyConditionalAiLogic } from '../../utils/functions/applyAiLogic';
import { reverseChessTurn } from '../../utils/functions';

const ChessBoard = ({ chessOrder, chessMap, chessTurn, hasWon, setChessOrder, setChessTurn }) => {
  useEffect(() => {
    if (chessOrder.length % 2 === 1 && !hasWon) {
      const aiChess = applyConditionalAiLogic(chessOrder, chessMap);
      setChessOrder((prevState) => [...prevState, aiChess]);
      reverseChessTurn(setChessTurn);
    }
  }, [chessOrder, chessMap, setChessOrder, setChessTurn, hasWon]);

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
