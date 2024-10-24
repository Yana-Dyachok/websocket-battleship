import { Messages } from '../types/enum';
const validatePlayerData = (name: string, password: string) => {
  let isValid = true;
  let errorMessage = '';

  if (name.length < 5) {
    isValid = false;
    errorMessage = Messages.TOO_SHORT;
  } else if (!/^[a-zA-Z\-]+$/.test(name)) {
    isValid = false;
    errorMessage = Messages.NAME_INVALID;
  }
  if (password.length < 5) {
    isValid = false;
    errorMessage = Messages.TOO_SHORT;
  }

  return { isValid, errorMessage };
};

export default validatePlayerData;
