import { Messages } from '../types/enum';
const validatePlayerData = (name: string) => {
  let isValid = true;
  let errorMessage = '';

  if (name.length < 3) {
    isValid = false;
    errorMessage = Messages.NAME_TOO_SHORT;
  } else if (!/^[a-zA-Z\-]+$/.test(name)) {
    isValid = false;
    errorMessage = Messages.NAME_INVALID;
  }

  return { isValid, errorMessage };
};

export default validatePlayerData;
