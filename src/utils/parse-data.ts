const parseData = (str: string) => {
  const data = JSON.parse(str);
  for (const value in data) {
    if (typeof data[value] === 'string') {
      if (data[value].includes('{')) data[value] = parseData(data[value]);
    }
  }
  return data;
};

export default parseData;
