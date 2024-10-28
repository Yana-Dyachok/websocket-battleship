import { RegistrationType } from '../../types/type';
import rooms from '../../db.ts/rooms';
import players from '../../db.ts/players';
import { Commands } from '../../types/enum';

const createRoomRequest = (req: RegistrationType, conectionID: number) => {
  if (req.type !== Commands.CREATE_ROOM) return;
  const roomExists = rooms.some((room) => room.roomId === conectionID);
  if (!roomExists) {
    const player = players.find((player) => player.index === conectionID);

    if (player) {
      const newRoom = {
        roomId: conectionID,
        roomUsers: [
          {
            name: player.name,
            index: player.index,
          },
        ],
      };
      rooms.push(newRoom);
    }
  }
};

export default createRoomRequest;
