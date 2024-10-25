import { IGame } from '../../types/interfaces/interfaces';
import { Commands } from '../../types/enum';

const getGameResponse = (
  actionType: Commands.CREATE_GAME | Commands.START_GAME | Commands.TURN | Commands.TURN_INIT,
  gameDetails: IGame
) => {
  let responseHost = '';
  let responsePlayer = '';

  const createResponse = (playerId: number) =>
    JSON.stringify({
      type: actionType,
      data: JSON.stringify({ gameId: gameDetails.hostId, playerId }),
      id: 0,
    });

  const startResponse = (playerId: number) =>
    JSON.stringify({
      type: Commands.START_GAME,
      data: JSON.stringify({
        ships: gameDetails.data.find((player) => player.indexPlayer === playerId)?.ships,
        currentPlayerIndex: playerId,
      }),
      id: 0,
    });

  switch (actionType) {
    case Commands.CREATE_GAME:
      responseHost = createResponse(gameDetails.hostId);
      responsePlayer = createResponse(gameDetails.clientId);
      break;

    case Commands.START_GAME:
      responseHost = startResponse(gameDetails.hostId);
      responsePlayer = startResponse(gameDetails.clientId);
      break;

    case Commands.TURN_INIT:
      gameDetails.turn =
        gameDetails.data[Math.floor(Math.random() * gameDetails.data.length)].indexPlayer;
    case Commands.TURN:
      if (actionType === Commands.TURN) {
        gameDetails.turn = gameDetails.data.find(
          (player) => player.indexPlayer !== gameDetails.turn
        )?.indexPlayer;
      }
      const turnResponse = JSON.stringify({
        type: Commands.TURN,
        data: JSON.stringify({ currentPlayer: gameDetails.turn }),
        id: 0,
      });
      responseHost = turnResponse;
      responsePlayer = turnResponse;
      break;

    default:
      break;
  }

  return {
    host: responseHost,
    client: responsePlayer,
    hostId: gameDetails.hostId,
    clientId: gameDetails.clientId,
    isOnline: gameDetails.isOnline,
  };
};

export default getGameResponse;
