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
import addShipsRequest from '../modules/requests/add-ships-request';
import getAttack from '../modules/get-attack/get-attack';
import randomAttackRequest from '../modules/requests/random-attack-request';

function createWSServer(PORT: number) {
  const connections = new Map<number, WebSocket>();
  let connectionID = 0;
  const wsClient = new WebSocketServer({ port: PORT });

  wsClient.on('listening', () => {
    const addressInfo = wsClient.address();
    if (typeof addressInfo === 'object' && addressInfo !== null) {
      const { address, family, port } = addressInfo;
      console.log(
        `WebSocket server started at address: ${address}, port: ${port}, family: ${family}`
      );
    } else {
      console.log(`WebSocket server started on port: ${PORT}`);
    }
  });

  wsClient.on('connection', (ws) => {
    const currentСonnectionID = connectionID++;
    connections.set(currentСonnectionID, ws);
    ws.on('message', (message) => {
      console.log('-> inbound message %s', message);
      const req: RegistrationType = parseData(message.toString());
      const requestTypes: RequestType[] = [
        {
          type: Commands.REG_USER,
          handler: () => {
            regRequest(ws, req, currentСonnectionID);
            updateRoomRequest(wsClient);
            updateWinnersRequest(wsClient);
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
          type: Commands.ADD_SHIPS,
          handler: () => {
            const game = addShipsRequest(req);
            if (game) {
              const startGame = getGameResponse(Commands.START_GAME, game);
              hostResponse(connections, game, startGame.host, startGame.client);
              const turnInit = getGameResponse(Commands.TURN_INIT, game);
              hostResponse(connections, game, turnInit.host, turnInit.client);
              if (!game.isOnline && game.turn === turnInit.clientId) {
                ws.emit(
                  'message',
                  JSON.stringify({
                    type: Commands.RANDOM_ATTACK,
                    data: JSON.stringify({
                      gameId: game?.idGame,
                      indexPlayer: game?.clientId,
                    }),
                    id: 0,
                  })
                );
              }
            }
          },
        },
        {
          type: Commands.ATTACK,
          handler: () => {
            getAttack(connections, wsClient, req, ws);
          },
        },
        {
          type: Commands.RANDOM_ATTACK,
          handler: () => {
            const newObj = randomAttackRequest(req);
            if (newObj) {
              getAttack(connections, wsClient, newObj, ws);
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
    ws.on('error', (error: Error) => {
      console.error(error);
    });
    ws.on('close', () => {
      console.log(Messages.CLIENT_DISCONNECT);
    });
  });

  return wsClient;
}

export default createWSServer;
