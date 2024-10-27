import { WebSocket } from 'ws';
import playerAuth from '../player-auth/player-auth';
import playerResponse from '../responses/player-response';
import { Commands } from '../../types/enum';
import { RegistrationType } from '../../types/type';

const regRequest = (ws: WebSocket, requestData: RegistrationType, conectionID: number) => {
  if (requestData.type === Commands.REG_USER) {
    const response = playerAuth(requestData, conectionID);
    playerResponse(ws, JSON.stringify(response));
    console.log(`outbound message ->`, JSON.stringify(response, null, 2));
  }
};

export default regRequest;
