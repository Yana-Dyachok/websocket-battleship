import { WebSocket } from 'ws';
import playerAuth from '../player-auth';
import playerResponse from '../responses/player-response';
import { Commands } from '../../types/enum';
import { RegistrationType } from '../../types/type';

const regRequest = (ws: WebSocket, requestData: RegistrationType, conectionID: number) => {
  if (requestData.type === Commands.REG_USER) {
    const response = playerAuth(requestData, conectionID);
    playerResponse(ws, JSON.stringify(response));
  }
};

export default regRequest;
