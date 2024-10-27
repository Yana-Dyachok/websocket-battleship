import games from '../../db.ts/games';
import { RegistrationType } from '../../types/type';
import { defaultBotShips } from '../../types/const';
import { generateShipField, generateShipCoordinates } from '../../utils/generate-ships';
import { Commands } from '../../types/enum';

const addShipsRequest = (req: RegistrationType) => {
  if (req.type === Commands.ADD_SHIPS) {
    const game = games.filter((game) => game.idGame === req.data.gameId)[0];
    if (game) {
      game.data[game.data.length] = {
        ships: generateShipCoordinates(req.data.ships),
        indexPlayer: req.data.indexPlayer,
        grid: generateShipField(req.data.ships),
      };
      if (!game.isOnline) {
        game.data[game.data.length] = {
          ships: generateShipCoordinates(defaultBotShips),
          indexPlayer: -1,
          grid: generateShipField(defaultBotShips),
        };
      }
      if (game.data.length === 2) {
        return game;
      }
    }
  }
};

export default addShipsRequest;
