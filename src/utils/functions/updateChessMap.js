const updateChessMap = (chessOrder, chessMap) => {
  const updatedChessMap = chessMap;
  chessOrder.forEach((order) => {
    updatedChessMap.forEach((mapElement) => {
      if (order.xIndex === mapElement.xIndex && order.yIndex === mapElement.yIndex) {
        // eslint-disable-next-line no-param-reassign
        mapElement.chessType = order.chessType;
      }
    });
  });
};

export default updateChessMap;
