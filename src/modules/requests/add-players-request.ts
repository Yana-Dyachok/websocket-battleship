import { RegistrationType } from '../../types/type';
import { Commands } from '../../types/enum';
import rooms from '../../db.ts/rooms';

const addPlayersRequest = (req: RegistrationType, conectionID: number) => {
  if (req.type === Commands.ADD_USER_TO_ROOM) {
    if (req.data.indexRoom !== conectionID) {
      const playRoom = rooms.find((room) => room.roomId === conectionID);
      if (playRoom) {
        rooms.splice(rooms.indexOf(playRoom), 1);
      }
      const hostRoom = rooms.find((room) => room.roomId === req.data.indexRoom);
      if (hostRoom) {
        rooms.splice(rooms.indexOf(hostRoom), 1);
      }
      return { host: req.data.indexRoom, client: conectionID, isOnline: true };
    }
  }
  return null;
};

export default addPlayersRequest;
