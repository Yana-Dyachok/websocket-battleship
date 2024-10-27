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
      console.log(`outbound message ->`, JSON.stringify(responseForHost, null, 2));
    }
    if (playerId === game.clientId) {
      connection.send(responseForClient);
      console.log(`outbound message ->`, JSON.stringify(responseForClient, null, 2));
    }
  });
};

export default hostResponse;
