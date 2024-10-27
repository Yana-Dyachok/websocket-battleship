import { IGame } from '../../types/interfaces/interfaces';
import { Commands } from '../../types/enum';
import { GameType } from '../../types/type';

const getGameResponse = (type: GameType, game: IGame) => {
  let hostResponse = '';
  let clientResponse = '';
  if (type === Commands.CREATE_GAME) {
    hostResponse = JSON.stringify({
      type: Commands.CREATE_GAME,
      data: JSON.stringify({ idGame: game.hostId, idPlayer: game.hostId }),
      id: 0,
    });
    clientResponse = JSON.stringify({
      type: Commands.CREATE_GAME,
      data: JSON.stringify({ idGame: game.hostId, idPlayer: game.clientId }),
      id: 0,
    });
  }
  if (type === Commands.START_GAME) {
    hostResponse = JSON.stringify({
      type: Commands.START_GAME,
      data: JSON.stringify({
        ships: game.data.filter((player) => player.indexPlayer === game.hostId)[0]?.ships,
        currentPlayerIndex: game.hostId,
      }),
      id: 0,
    });
    clientResponse = JSON.stringify({
      type: Commands.START_GAME,
      data: JSON.stringify({
        ships: game.data.filter((player) => player.indexPlayer === game.clientId)[0]?.ships,
        currentPlayerIndex: game.clientId,
      }),
      id: 0,
    });
  }
  if (type === Commands.TURN_INIT) {
    game.turn = game.data.map((player) => player.indexPlayer)[Math.floor(Math.random() * 2)];
  }
  if (type === Commands.TURN) {
    game.turn = game.data.filter((player) => player.indexPlayer !== game.turn)[0]?.indexPlayer;
  }
  if (type === Commands.TURN || type === Commands.TURN_INIT) {
    hostResponse = JSON.stringify({
      type: Commands.TURN,
      data: JSON.stringify({
        currentPlayer: game.turn,
      }),
      id: 0,
    });
    clientResponse = hostResponse;
  }
  return {
    host: hostResponse,
    client: clientResponse,
    hostId: game.hostId,
    clientId: game.clientId,
    isOnline: game.isOnline,
  };
};

export default getGameResponse;
