import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const Canvas = styled.canvas`
  border: 1px solid #CCC;
`;

const App = () => {
  const [players, setPlayers] = useState({});
  // const [fruits, setfruits] = useState({});
  const screenEl = useRef(null);

  const demoInfo = {
    player1: {
      color: 'red',
      positionX: 0,
      positionY: 0,
      width: 50,
      height: 50,
    },
    player2: {
      color: 'green',
      positionX: 100,
      positionY: 150,
      width: 50,
      height: 50,
    },
  };

  useEffect(() => {
    const setInitialPlayers = () => {
      if (JSON.stringify(players) !== JSON.stringify(demoInfo)) {
        setPlayers(demoInfo);
      }
    };

    const drawPlayers = () => {
      const context = screenEl.current.getContext('2d');

      if (!isEmpty(players)) {
        Object.values(players).forEach((player) => {
          context.fillStyle = player.color;
          context.fillRect(player.positionX, player.positionY, player.width, player.height);
        });
      }
    };

    setInitialPlayers();
    drawPlayers();
  }, [players, demoInfo]);

  return (
    <>
      <Canvas id="screen" ref={screenEl} width="500" height="500" />
    </>
  );
};

export default App;
