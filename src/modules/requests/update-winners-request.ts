import { WebSocketServer } from 'ws';
import players from '../../db.ts/players';
import playersResponse from '../responses/players-response';
import { Commands } from '../../types/enum';

const updateWinnersRequest = (server: WebSocketServer) => {
  playersResponse(
    server,
    JSON.stringify({ type: Commands.UPDATE_WINNERS, data: JSON.stringify(players), id: 0 })
  );
};

export default updateWinnersRequest;
