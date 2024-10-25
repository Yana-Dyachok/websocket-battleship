import { IGame } from '../../types/interfaces/interfaces';
import { WebSocket } from 'ws';

const hostResponse = (
  connections: Map<number, WebSocket>,
  game: IGame,
  responseForHost: string,
  responseForClient: string
) => {
  connections.forEach((connection, playerId) => {
    if (playerId === game.hostId) {
      connection.send(responseForHost);
    }
    if (playerId === game.clientId) {
      connection.send(responseForClient);
    }
  });
};

export default hostResponse;
