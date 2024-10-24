import { WebSocketServer } from 'ws';

const playersResponse = (server: WebSocketServer, response: string) => {
  server.clients.forEach((client) => {
    client.send(response);
  });
};

export default playersResponse;
