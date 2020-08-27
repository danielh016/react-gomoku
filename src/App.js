import React, { useState } from 'react';
import { ChessBoard, Dialog } from './components';
import { CHESS_TYPES } from './utils/constants';
import { setEmptyChessMap, updateChessMap, getWinningChessType } from './utils/functions';

function App() {
  const FIRST_TURN_COLOR = CHESS_TYPES.BLACK;
  const [chessOrder, setChessOrder] = useState([]);
  const [chessTurn, setChessTurn] = useState(FIRST_TURN_COLOR);
  const chessMap = setEmptyChessMap();
  const chessTypeHasWon = getWinningChessType(chessOrder);
  updateChessMap(chessOrder, chessMap);

  return (
    <>
      <ChessBoard
        chessMap={chessMap}
        chessTurn={chessTurn}
        hasWon={!!chessTypeHasWon}
        setChessOrder={setChessOrder}
        setChessTurn={setChessTurn}
      />
      <Dialog
        firstTurnColor={FIRST_TURN_COLOR}
        chessTypeHasWon={chessTypeHasWon}
        setChessOrder={setChessOrder}
        setChessTurn={setChessTurn}
      />
    </>
  );
}

export default App;
