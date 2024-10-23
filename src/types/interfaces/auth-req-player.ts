import { Commands } from '../enum';

export default interface IAuthReqPlayer {
  type: Commands.REG_USER;
  data: {
    name: string;
    password: string;
  };
  id: 0;
}
