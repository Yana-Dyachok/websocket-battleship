import { RegistrationType } from '../../types/type';
import games from '../../db.ts/games';
import { generateAttackResponse, getCellAround } from '../../utils/generate-attack';
import { Commands, Attack } from '../../types/enum';

const attackRequest = (req: RegistrationType) => {
  if (req.type === Commands.ATTACK) {
    const game = games.find((game) => game.idGame === req.data.gameId);
    if (game && game.turn === req.data.indexPlayer) {
      const responses: string[] = [];
      const field = game.data.find((user) => user.indexPlayer !== req.data.indexPlayer)?.grid;

      if (!field) return { game, responses: undefined };

      const targetCell = field[req.data.y][req.data.x];
      let isHit = false;

      if (targetCell === 0) {
        field[req.data.y][req.data.x] = 2;
        responses.push(
          generateAttackResponse(req.data.x, req.data.y, req.data.indexPlayer, Attack.MISSED)
        );
        game.turn = game.turn === 0 ? 0 : 1;
      } else if (targetCell === 1) {
        isHit = true;
        game.turn = game.turn === 0 ? 1 : 0;
        const opponent = game.data.find((user) => user.indexPlayer !== req.data.indexPlayer);
        const ship = opponent?.ships.find((ship) =>
          ship.shipCells?.some((cell) => cell.x === req.data.x && cell.y === req.data.y)
        );

        if (ship) {
          const cell = ship.shipCells?.find(
            (cell) => cell.x === req.data.x && cell.y === req.data.y
          );
          if (cell && cell.status === 1) {
            cell.status = 3;
            field[req.data.y][req.data.x] = 3;
            responses.push(
              generateAttackResponse(req.data.x, req.data.y, req.data.indexPlayer, Attack.SHOT)
            );
            if (ship.shipCells?.every((cell) => cell.status === 3)) {
              ship.shipCells.forEach((cell) => {
                cell.status = 4;
                field[cell.y][cell.x] = 4;
                responses.push(
                  generateAttackResponse(cell.x, cell.y, req.data.indexPlayer, Attack.KILLED)
                );
                getCellAround(field, cell.y, cell.x).forEach((aroundCell) => {
                  if (field[aroundCell.y][aroundCell.x] === 0) {
                    field[aroundCell.y][aroundCell.x] = 2;
                    responses.push(
                      generateAttackResponse(
                        aroundCell.x,
                        aroundCell.y,
                        req.data.indexPlayer,
                        Attack.MISSED
                      )
                    );
                  }
                });
              });
              ship.isKilled = true;
            }
          }
        }
      }

      return { game, responses: responses.length > 0 ? responses : undefined };
    }
  }
  return { game: undefined, responses: undefined };
};

export default attackRequest;
