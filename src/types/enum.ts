export enum Commands {
  REG_USER = 'reg',
  CREATE_GAME = 'create_game',
  START_GAME = 'start_game',
  CREATE_ROOM = 'create_room',
  ADD_SHIPS = 'add_ships',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  TURN = 'turn',
  TURN_INIT = 'turn_init',
  FINISH = 'finish',
  DISCONNECT = 'disconnect',
  SINGLE_PLAY = 'single_play',
}

export enum Messages {
  WS_CONNECT = 'WebSocket server running on port',
  WS_EXIT = 'WebSocket server is closed',
  CLIENT_EXIT = 'Client is closed',
  CLIENT_CONNECT = 'Client connected',
  CLIENT_DISCONNECT = 'Client disconnected',
  UNKNOWN_COMMAND = 'Unknown command',
  NAME_INVALID = 'Name must contain only letters',
  TOO_SHORT = 'Must be at least 5 characters',
  WRONG_PASSWORD = 'Wrong password',
  AUTH_SUCCESS = '',
}

export const enum Attack {
  MISSED = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
  ERROR = 'error',
}
