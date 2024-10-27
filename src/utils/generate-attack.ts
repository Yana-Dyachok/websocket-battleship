import { Attack, Commands } from '../types/enum';

export const getCellAround = (field: number[][], y: number, x: number) => {
  const cells: { x: number; y: number }[] = [];
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (j >= 0 && j < 10 && i >= 0 && i < 10 && (i !== y || j !== x) && field[i][j] === 0) {
        cells.push({ x: j, y: i });
      }
    }
  }
  return cells;
};

export const generateAttackResponse = (
  x: number,
  y: number,
  indexPlayer: number,
  status: Attack.MISSED | Attack.KILLED | Attack.SHOT
) => {
  return JSON.stringify({
    type: Commands.ATTACK,
    data: JSON.stringify({
      position: {
        x,
        y,
      },
      currentPlayer: indexPlayer,
      status: status,
    }),
    id: 0,
  });
};
