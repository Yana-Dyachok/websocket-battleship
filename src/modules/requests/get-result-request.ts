import { RegistrationType } from '../../types/type';
import games from '../../db.ts/games';
import players from '../../db.ts/players';
import { Commands } from '../../types/enum';

const getResultRequest = (req: RegistrationType) => {
  if (req.type === Commands.ATTACK) {
    const game = games.filter((game) => game.idGame === req.data.gameId)[0];
    const ships = game.data.filter((player) => player.indexPlayer !== req.data.indexPlayer)[0]
      .ships;
    if (ships.length === ships.reduce((acc, ship) => (ship.isKilled ? acc + 1 : acc), 0)) {
      const player = players.filter((player) => player.index === req.data.indexPlayer)[0];
      if (player.wins !== undefined) {
        player.wins = player.wins + 1;
      }
      games.splice(games.indexOf(game), 1);
      return {
        game,
        response: JSON.stringify({
          type: Commands.FINISH,
          data: JSON.stringify({
            winPlayer: req.data.indexPlayer,
          }),
          id: 0,
        }),
      };
    }
  } else {
    return undefined;
  }
};

export default getResultRequest;
