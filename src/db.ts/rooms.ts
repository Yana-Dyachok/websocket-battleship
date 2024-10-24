import IPlayer from '../types/interfaces/interfaces';

interface IRoom {
  idRoom: number;
  playersRoom: IPlayer[];
}

const rooms: IRoom[] = [];

export default rooms;
