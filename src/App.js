import queryString from 'query-string';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Chat, MultiChessBoard, Dialog, Entry, SingleChessBoard } from './components';
import { CHESS_TYPES, getDefaultChessOrder, getFirstTurnColor } from './utils/constants';
import { setEmptyChessMap, updateChessMap, getWinningChessType } from './utils/functions';

const ENDPOINT = 'http://18.206.247.59:4000';
let socket;

const MultiplayerApp = () => {
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
      <MultiChessBoard
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

const SingleplayerApp = ({ isWhite = false }) => {
  const FIRST_TURN_COLOR = getFirstTurnColor(isWhite);
  const [chessOrder, setChessOrder] = useState(getDefaultChessOrder(isWhite));
  const [chessTurn, setChessTurn] = useState(FIRST_TURN_COLOR);
  const chessMap = setEmptyChessMap();
  const chessTypeHasWon = getWinningChessType(chessOrder);
  updateChessMap(chessOrder, chessMap);

  return (
    <>
      <SingleChessBoard
        chessOrder={chessOrder}
        chessMap={chessMap}
        chessTurn={chessTurn}
        isWhite={isWhite}
        hasWon={!!chessTypeHasWon}
        setChessOrder={setChessOrder}
        setChessTurn={setChessTurn}
      />
      <Dialog
        chessTypeHasWon={chessTypeHasWon}
        isWhite={isWhite}
        setChessOrder={setChessOrder}
        setChessTurn={setChessTurn}
      />
    </>
  );
};

const RouterApp = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/entry" element={<Entry />} />
        <Route path="/game" element={<MultiplayerApp />} />
        <Route path="/white" element={<SingleplayerApp isWhite />} />
        <Route exact path="/" element={<SingleplayerApp />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
