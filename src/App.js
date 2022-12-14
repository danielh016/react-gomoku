import queryString from 'query-string';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Chat, ChessBoard, Dialog, Entry } from './components';
import { CHESS_TYPES } from './utils/constants';
import { setEmptyChessMap, updateChessMap, getWinningChessType } from './utils/functions';

const ENDPOINT = 'http://54.237.203.190:4000';

let socket;

const App = () => {
  const location = useLocation();
  const FIRST_TURN_COLOR = CHESS_TYPES.BLACK;
  const [chessOrder, setChessOrder] = useState([]);
  const [chessTurn, setChessTurn] = useState(FIRST_TURN_COLOR);
  const [name, setName] = useState('');
  const chessMap = setEmptyChessMap();
  const chessTypeHasWon = getWinningChessType(chessOrder);
  updateChessMap(chessOrder, chessMap);

  useEffect(() => {
    const { name: urlName, room: urlRoom } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(urlName);
    socket.emit('join', { name: urlName, room: urlRoom }, (error) => {
      if (error) alert(error);
    });
  }, [location.search]);

  return (
    <>
      <ChessBoard
        firstTurnColor={FIRST_TURN_COLOR}
        chessMap={chessMap}
        chessTurn={chessTurn}
        hasWon={!!chessTypeHasWon}
        setChessOrder={setChessOrder}
        setChessTurn={setChessTurn}
        socket={socket}
      />
      <Dialog chessTypeHasWon={chessTypeHasWon} socket={socket} />
      <Chat name={name} socket={socket} />
    </>
  );
};

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
