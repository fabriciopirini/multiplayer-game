import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const Canvas = styled.canvas`
  border: 10px solid #CCC;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 400px;
  height: 400px;
`;

const App = () => {
  const [players, setPlayers] = useState({});
  const [fruits, setFruits] = useState({});
  const screenEl = useRef(null);
  const gridSize = 10;

  const demoPlayers = {
    player1: {
      color: 'red',
      positionX: 1,
      positionY: 1,
    },
    player2: {
      color: 'blue',
      positionX: 2,
      positionY: 3,
    },
  };

  const demoFruits = {
    fruit1: {
      color: 'yellow',
      positionX: 5,
      positionY: 5,
    },
    fruit2: {
      color: 'yellow',
      positionX: 2,
      positionY: 7,
    },
  };

  const updatePlayer = (playerId, key, value) => {
    setPlayers({
      ...players,
      [playerId]: {
        ...players[playerId],
        [key]: value,
      },
    });
  };

  const validPosition = (key, add) => (
    players.player1[key] + add < gridSize && players.player1[key] + add >= 0
      ? players.player1[key] + add
      : players.player1[key]);

  const movePlayer = {
    ArrowRight(player) {
      const newPos = validPosition('positionX', 1);
      updatePlayer(player, 'positionX', newPos);
    },
    ArrowLeft(player) {
      const newPos = validPosition('positionX', -1);
      updatePlayer(player, 'positionX', newPos);
    },
    ArrowUp(player) {
      const newPos = validPosition('positionY', -1);
      updatePlayer(player, 'positionY', newPos);
    },
    ArrowDown(player) {
      const newPos = validPosition('positionY', 1);
      updatePlayer(player, 'positionY', newPos);
    },
  };

  const handleKeyPress = useCallback(
    (event) => {
      const keyName = event.key;

      if (!isEmpty(players)) {
        movePlayer[keyName]('player1');
      }
    },
    [players, movePlayer],
  );

  useEffect(() => {
    const initializeData = () => {
      if (isEmpty(players)) {
        setPlayers(demoPlayers);
      }
      if (isEmpty(fruits)) {
        setFruits(demoFruits);
      }
    };

    const renderScreen = () => {
      const context = screenEl.current.getContext('2d');
      context.fillStyle = 'white';
      context.clearRect(0, 0, 10, 10);

      if (!isEmpty(players)) {
        Object.entries(players).forEach(([playerId, player]) => {
          context.fillStyle = player.color;
          context.fillRect(player.positionX, player.positionY, 1, 1);
        });
      }

      if (!isEmpty(fruits)) {
        Object.entries(fruits).forEach(([fruitId, fruit]) => {
          context.fillStyle = fruit.color;
          context.fillRect(fruit.positionX, fruit.positionY, 1, 1);
        });
      }
    };

    initializeData();
    renderScreen();

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [players, fruits, demoPlayers, demoFruits, handleKeyPress]);

  return (
    <>
      <Canvas id="screen" ref={screenEl} width={gridSize} height={gridSize} />
    </>
  );
};

export default App;
