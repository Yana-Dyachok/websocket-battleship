import { WebSocketServer } from 'ws';
import rooms from '../../db.ts/rooms';
import playersResponse from '../responses/players-response';
import { Commands } from '../../types/enum';

const updateRoomRequest = (server: WebSocketServer) => {
  playersResponse(
    server,
    JSON.stringify({ type: Commands.UPDATE_ROOM, data: JSON.stringify(rooms), id: 0 })
  );
};

export default updateRoomRequest;
