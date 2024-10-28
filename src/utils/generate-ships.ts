import { IShip } from '../types/interfaces/interfaces';

export const generateShipCoordinates = (ships: IShip[]) => {
  return ships.map((ship) => {
    ship.shipCells = [];
    for (let i = 0; i < ship.length; i++) {
      ship.shipCells.push({
        y: ship.direction ? ship.position.y + i : ship.position.y,
        x: ship.direction ? ship.position.x : ship.position.x + i,
        status: 1,
      });
    }
    ship.isKilled = false;
    return ship;
  });
};

export const generateShipField = (ships: IShip[]): number[][] => {
  const field: number[][] = createField();

  ships.forEach((ship) => {
    for (let i = 0; i < ship.length; i++) {
      field[ship.direction ? ship.position.y + i : ship.position.y][
        ship.direction ? ship.position.x : ship.position.x + i
      ] = 1;
    }
  });

  return field;
};

export const createField = () =>
  Array(10)
    .fill(0)
    .map(() => Array(10).fill(0)) as number[][];

export const createShips = () =>
  Array(10).fill({
    position: {
      x: 0,
      y: 0,
    },
    direction: true,
    length: 1,
    type: 'small',
    isKilled: false,
  });
