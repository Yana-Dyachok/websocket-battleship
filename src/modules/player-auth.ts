import players from '../db.ts/players';
import validatePlayerData from '../utils/validate-player-data';
import { Messages, Commands } from '../types/enum';
import IRegistrationPlayer from '../types/interfaces/registration-player';

const playerAuth = (requestsData: IRegistrationPlayer, conectionID: number) => {
  let playerIndex = -1;
  let isError = false;
  let errorText = '';

  const player = players.filter((player) => player.name === requestsData.data.name)[0];

  if (!player) {
    playerIndex = conectionID;
    const validation = validatePlayerData(requestsData.data.name, requestsData.data.password);

    if (!validation.isValid) {
      isError = true;
      errorText = validation.errorMessage;
    } else {
      players.push({
        index: conectionID,
        name: requestsData.data.name,
        password: requestsData.data.password,
        wins: 0,
      });
      playerIndex = conectionID;
    }
  } else {
    playerIndex = conectionID;
    if (player.password === requestsData.data.password) {
      isError = false;
      errorText = '';
      player.index = conectionID;
    } else {
      isError = true;
      errorText = Messages.WRONG_PASSWORD;
    }
  }

  return {
    type: Commands.REG_USER,
    data: JSON.stringify({
      name: requestsData.data.name,
      index: playerIndex,
      error: isError,
      errorText,
    }),
    id: 0,
  };
};

export default playerAuth;
