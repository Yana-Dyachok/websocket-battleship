import { IGamePrimary } from '../../types/interfaces/interfaces';
import games from '../../db.ts/games';

const createGameRequest = (data: IGamePrimary) => {
  const existingGame = games.find((game) => game.hostId === data.host);
  if (existingGame) {
    return existingGame;
  }

  const newGame = {
    idGame: data.host,
    hostId: data.host,
    clientId: data.client,
    data: [],
    isOnline: data.isOnline,
  };

  games.push(newGame);
  return newGame;
};

export default createGameRequest;
