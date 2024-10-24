import { Commands } from '../enum';

export default interface IPlayer {
  index: number;
  name: string;
  password?: string;
  wins?: number;
}

export interface IUpdateWins {
  name: string;
  wins: number;
}

export interface IPlayerAuth {
  name: string;
  password: string;
}

export interface IPlayerData extends IPlayerAuth {
  socketId: string;
  index: string;
}

export interface IPlayerErrData {
  name: string;
  index: string;
  error?: boolean;
  errorText: string;
}

export interface IAuth {
  type: Commands;
  data: IPlayerAuth;
  id: string;
}

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
  shipCells?: { x: number; y: number; status: 1 | 3 | 4 }[];
  isKilled?: boolean;
}

export interface IAuthAResponse {
  type: Commands.REG_USER;
  data: IPlayerErrData;
  id: number;
}

export interface IUpdateWinRequest {
  type: Commands.UPDATE_WINNERS;
  data: IUpdateWins[];
  id: number;
}

export interface IAddPlayersToRoom {
  type: Commands.ADD_USER_TO_ROOM;
  data: {
    indexRoom: number;
  };
  id: 0;
}

export interface IAddShips {
  type: Commands.ADD_SHIPS;
  data: {
    gameId: number;
    ships: IShip[];
    indexPlayer: number;
  };
  id: 0;
}

export interface IAttack {
  type: Commands.ATTACK;
  data: {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: number;
  };
  id: 0;
}

export interface ICreateRoom {
  type: Commands.CREATE_ROOM;
  data: '';
  id: 0;
}

export interface IRandomAttack {
  type: Commands.RANDOM_ATTACK;
  data: {
    gameId: number;
    indexPlayer: number;
  };
  id: 0;
}