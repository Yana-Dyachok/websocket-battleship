import IPlayer from '../types/interfaces/interfaces';

interface IRoom {
  roomId: number;
  roomUsers: IPlayer[];
}

const rooms: IRoom[] = [];

export default rooms;
