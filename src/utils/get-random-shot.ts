const getRandomShot = (field: number[][]): { x: number; y: number } => {
  const cell = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
  return field[cell.y][cell.x] !== 0 && field[cell.y][cell.x] !== 1 ? getRandomShot(field) : cell;
};

export default getRandomShot;
