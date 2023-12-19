import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chess } from './components';
import { ChessBoardContainer } from './chessBoardStyles';
import { reverseChessTurn } from '../../utils/functions';

const ChessBoard = ({
  firstTurnColor,
  chessMap,
  chessTurn,
  hasWon,
  setChessOrder,
  setChessTurn,
  socket,
}) => {
  useEffect(() => {
    if (socket) {
      socket.on('updateChessOrder', ({ xIndex, yIndex, chessType }) => {
        setChessOrder((prevState) => [
          ...prevState,
          { xIndex: `${xIndex}`, yIndex: `${yIndex}`, chessType },
        ]);
        reverseChessTurn(setChessTurn);
      });

      socket.on('resetChessMap', () => {
        setChessOrder([]);
        setChessTurn(firstTurnColor);
      });

      socket.on('undoChessAction', () => {
        setChessOrder((prevState) => {
          prevState.pop();
          return [...prevState];
        });
        reverseChessTurn(setChessTurn);
      });
    }
  }, [socket, firstTurnColor, setChessOrder, setChessTurn]);

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
          socket={socket}
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
