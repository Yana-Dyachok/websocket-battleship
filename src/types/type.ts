import {
  IAddPlayersToRoom,
  IAddShips,
  ICreateRoom,
  IRandomAttack,
  IAttack,
} from './interfaces/interfaces';
import IRegistrationPlayer from './interfaces/registration-player';
import ISinglePlay from './interfaces/single-play';
export type RegistrationType =
  | IRegistrationPlayer
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
