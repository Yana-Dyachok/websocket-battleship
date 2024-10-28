import WebSocket from 'ws';

const playerResponse = (ws: WebSocket, response: string) => {
  ws.send(response);
};

export default playerResponse;
