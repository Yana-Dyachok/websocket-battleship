import games from '../../db.ts/games';
import { RegistrationType } from '../../types/type';
import { defaultBotShips } from '../../types/const';
import { generateShipField, generateShipCoordinates } from '../../utils/generate-ships';
import { Commands } from '../../types/enum';

const addShipsRequest = (req: RegistrationType) => {
  if (req.type === Commands.ADD_SHIPS) {
    const currentGame = games.find((game) => game.idGame === req.data.gameId);

    if (currentGame) {
      currentGame.data[currentGame.data.length] = {
        ships: generateShipCoordinates(req.data.ships),
        indexPlayer: req.data.indexPlayer,
        grid: generateShipField(req.data.ships),
      };
      if (!currentGame.isOnline) {
        currentGame.data[currentGame.data.length] = {
          ships: generateShipCoordinates(defaultBotShips),
          indexPlayer: -1,
          grid: generateShipField(defaultBotShips),
        };

        if (currentGame.data.length === 2) {
          return currentGame;
        }
      }
    }
  }
};

export default addShipsRequest;
