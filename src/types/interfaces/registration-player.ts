import { Commands } from '../enum';

export default interface IRegistrationPlayer {
  type: Commands.REG_USER;
  data: {
    name: string;
    password: string;
  };
  id: 0;
}
