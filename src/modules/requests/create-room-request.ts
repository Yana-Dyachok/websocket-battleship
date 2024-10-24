import { RegistrationType } from '../../types/type';
import rooms from '../../db.ts/rooms';
import players from '../../db.ts/players';

const createRoomRequest = (req: RegistrationType, socketID: number): void => {
  if (req.type !== 'create_room') return;
  const roomExists = rooms.some((room) => room.idRoom === socketID);
  if (!roomExists) {
    const player = players.find((player) => player.index === socketID);

    if (player) {
      const newRoom = {
        idRoom: socketID,
        playersRoom: [
          {
            name: player.name,
            index: player.index,
          },
        ],
      };
      rooms.push(newRoom);
      console.log(rooms);
    }
  }
};

export default createRoomRequest;
