import { RegistrationType } from '../../types/type';
import { Commands } from '../../types/enum';
import rooms from '../../db.ts/rooms';

const addPlayersRequest = (req: RegistrationType, socketID: number) => {
  if (req.type === Commands.ADD_USER_TO_ROOM) {
    if (req.data.indexRoom !== socketID) {
      const clientRoom = rooms.find((room) => room.roomId === socketID);
      if (clientRoom) {
        rooms.splice(rooms.indexOf(clientRoom), 1);
      }
      const hostRoom = rooms.find((room) => room.roomId === req.data.indexRoom);
      if (hostRoom) {
        rooms.splice(rooms.indexOf(hostRoom), 1);
      }
      return { host: req.data.indexRoom, client: socketID, isOnline: true };
    }
  }
  return null;
};

export default addPlayersRequest;
