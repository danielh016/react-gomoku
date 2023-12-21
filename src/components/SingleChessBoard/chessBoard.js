import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chess } from './components';
import { ChessBoardContainer } from './chessBoardStyles';
import { applyConditionalAiLogic } from '../../utils/functions/applyAiLogic';
import { reverseChessTurn } from '../../utils/functions';

const ChessBoard = ({
  chessOrder,
  chessMap,
  chessTurn,
  isWhite,
  hasWon,
  setChessOrder,
  setChessTurn,
}) => {
  useEffect(() => {
    const placingOrder = isWhite ? chessOrder.length % 2 === 0 : chessOrder.length % 2 === 1;

    if (placingOrder && !hasWon) {
      const aiChess = applyConditionalAiLogic(chessOrder, chessMap);
      setChessOrder((prevState) => [...prevState, aiChess]);
      reverseChessTurn(setChessTurn);
    }
  }, [chessOrder, chessMap, setChessOrder, setChessTurn, isWhite, hasWon]);

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
  isWhite: PropTypes.bool.isRequired,
  hasWon: PropTypes.bool.isRequired,
  setChessOrder: PropTypes.func.isRequired,
  setChessTurn: PropTypes.func.isRequired,
};

export default ChessBoard;
