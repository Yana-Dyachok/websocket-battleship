import { WebSocketServer, WebSocket } from 'ws';
import regRequest from '../modules/requests/reg-request';
import { RegistrationType, RequestType } from '../types/type';
import { Commands, Messages } from '../types/enum';
import parseData from '../utils/parse-data';
import createRoomRequest from '../modules/requests/create-room-request';
import addPlayersRequest from '../modules/requests/add-players-request';
import updateRoomRequest from '../modules/requests/update-room-request';
import updateWinnersRequest from '../modules/requests/update-winners-request';
import createGameRequest from '../modules/requests/create-game-request';
import getGameResponse from '../modules/responses/get-game-response';
import hostResponse from '../modules/responses/host-response';

function createWSServer(PORT: number) {
  const connections = new Map<number, WebSocket>();
  let connectionID = 0;
  const wsClient = new WebSocketServer({ port: PORT });
  console.log(`WebSocket server started at ws://localhost:${PORT}`);

  wsClient.on('connection', (ws) => {
    const currentСonnectionID = connectionID++;
    connections.set(currentСonnectionID, ws);
    ws.on('message', (message) => {
      const req: RegistrationType = parseData(message.toString());
      const requestTypes: RequestType[] = [
        {
          type: Commands.REG_USER,
          handler: () => {
            regRequest(ws, req, currentСonnectionID);
            updateWinnersRequest(wsClient);
            updateRoomRequest(wsClient);
          },
        },
        {
          type: Commands.CREATE_ROOM,
          handler: () => {
            createRoomRequest(req, currentСonnectionID);
            updateRoomRequest(wsClient);
          },
        },
        {
          type: Commands.ADD_USER_TO_ROOM,
          handler: () => {
            const gameData = addPlayersRequest(req, currentСonnectionID);
            if (gameData) {
              const game = createGameRequest(gameData);
              updateWinnersRequest(wsClient);
              const response = getGameResponse(Commands.CREATE_GAME, game);
              hostResponse(connections, game, response.host, response.client);
            }
          },
        },
        {
          type: Commands.SINGLE_PLAY,
          handler: () => {
            const game = createGameRequest({
              host: currentСonnectionID,
              client: -1,
              isOnline: false,
            });
            const response = getGameResponse(Commands.CREATE_GAME, game);
            hostResponse(connections, game, response.host, response.client);
          },
        },
      ];

      requestTypes.forEach((request) => {
        if (request.type === req.type) {
          request.handler();
        }
      });
    });

    ws.on('close', () => {
      console.log(Messages.CLIENT_DISCONNECT);
    });
  });

  return wsClient;
}

export default createWSServer;
