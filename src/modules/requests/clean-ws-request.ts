import rooms from '../../db.ts/rooms';
import games from '../../db.ts/games';
import { createField, createShips } from '../../utils/generate-ships';

const cleanWSRequest = (connectionID: number) => {
  const roomIndex = rooms.findIndex((room) => room.roomId === connectionID);
  if (roomIndex !== -1) {
    rooms.splice(roomIndex, 1);
  }

  const game = games.find((game) => game.clientId === connectionID || game.hostId === connectionID);
  if (game) {
    game.data = [
      { indexPlayer: game.clientId, grid: createField(), ships: createShips() },
      { indexPlayer: game.hostId, grid: createField(), ships: createShips() },
    ];

    const currentPlayerData = game.data.find((data) => data.indexPlayer === connectionID);
    currentPlayerData?.ships.forEach((ship) => (ship.isKilled = true));

    return game;
  }
};

export default cleanWSRequest;
