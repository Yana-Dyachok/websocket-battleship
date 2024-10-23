import {
  IAddPlayersToRoom,
  IAddShips,
  ICreateRoom,
  IRandomAttack,
  IAttack,
} from './interfaces/interfaces';
import IAuthReqPlayer from './interfaces/auth-req-player';
import ISinglePlay from './interfaces/single-play';
export type RegistrationType =
  | IAuthReqPlayer
  | ICreateRoom
  | IAddPlayersToRoom
  | IAddShips
  | IAttack
  | IRandomAttack
  | ISinglePlay;

export type RequestType = {
  type: RegistrationType['type'];
  handler: () => void;
};
