import { WebSocketServer } from 'ws';
import regRequest from '../modules/requests/reg-request';
import { RegistrationType, RequestType } from '../types/type';
import { Commands, Messages } from '../types/enum';
import parseData from '../utils/parse-data';
import createRoomRequest from '../modules/requests/create-room-request';

function createWSServer(PORT: number) {
  let socketID = 0;
  const wsClient = new WebSocketServer({ port: PORT });
  console.log(`WebSocket server started at ws://localhost:${PORT}`);

  wsClient.on('connection', (ws) => {
    const currentSocketID = socketID++;

    ws.on('message', (message) => {
      const reqObj: RegistrationType = parseData(message.toString());

      const requestTypes: RequestType[] = [
        {
          type: Commands.REG_USER,
          handler: () => {
            regRequest(ws, reqObj, currentSocketID);
          },
        },
        {
          type: Commands.CREATE_ROOM,
          handler: () => {
            createRoomRequest(reqObj, currentSocketID);
          },
        },
      ];

      requestTypes.forEach((request) => {
        if (request.type === reqObj.type) {
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
