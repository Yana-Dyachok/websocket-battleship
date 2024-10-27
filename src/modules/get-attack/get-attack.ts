import { WebSocketServer, WebSocket } from 'ws';
import updateWinnersRequest from '../requests/update-winners-request';
import { RegistrationType } from '../../types/type';
import attackRequest from '../requests/attack-request';
import hostResponse from '../responses/host-response';
import getGameResponse from '../responses/get-game-response';
import getResultRequest from '../requests/get-result-request';
import { Commands } from '../../types/enum';

const getAttack = (
  connections: Map<number, WebSocket>,
  wsServer: WebSocketServer,
  req: RegistrationType,
  ws: WebSocket
) => {
  const { game, responses } = attackRequest(req);
  if (game && responses) {
    responses.forEach((response) => hostResponse(connections, game, response, response));
    const turnInit = getGameResponse(Commands.TURN, game);
    hostResponse(connections, game, turnInit.host, turnInit.client);
    const response = getResultRequest(req);
    if (response) {
      hostResponse(connections, response.game, response.response, response.response);
      updateWinnersRequest(wsServer);
    } else if (!game.isOnline && game.turn === turnInit.clientId) {
      setTimeout(() => {
        ws.emit(
          'message',
          JSON.stringify({
            type: Commands.RANDOM_ATTACK,
            data: JSON.stringify({
              gameId: game?.idGame,
              indexPlayer: -1,
            }),
            id: 0,
          })
        );
      }, 1000);
    }
  }
};

export default getAttack;
