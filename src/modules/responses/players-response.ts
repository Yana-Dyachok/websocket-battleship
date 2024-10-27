import { WebSocketServer } from 'ws';

const playersResponse = (server: WebSocketServer, response: string) => {
  server.clients.forEach((client) => {
    client.send(response);
  });
  console.log(`outbound message ->`, JSON.stringify(response, null, 2));
};

export default playersResponse;
