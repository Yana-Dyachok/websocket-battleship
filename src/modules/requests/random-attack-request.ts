import { IAttack } from '../../types/interfaces/interfaces';
import { RegistrationType } from '../../types/type';
import games from '../../db.ts/games';
import { Commands } from '../../types/enum';
import getRandomShot from '../../utils/get-random-shot';

const randomAttackRequest = (req: RegistrationType) => {
  if (req.type === Commands.RANDOM_ATTACK) {
    const game = games.filter((game) => game.idGame === req.data.gameId)[0];
    const field = game.data.filter((user) => user.indexPlayer !== req.data.indexPlayer)[0].grid;
    const { x, y } = getRandomShot(field);
    const { data, id } = req;
    const newObj: IAttack = {
      type: Commands.ATTACK,
      data: { ...data, x, y },
      id,
    };
    return newObj;
  }

  return;
};

export default randomAttackRequest;
