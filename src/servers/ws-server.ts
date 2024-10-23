import { WebSocketServer } from 'ws';
function createWSServer(PORT: number) {
  const wsServer = new WebSocketServer({ port: PORT });
  console.log(`WebSocket server started at ws://localhost:${PORT}`);
  wsServer.on('connection', (wsClient) => {
    console.log('new client');
    wsClient.send('Hello, Client!');
    wsClient.on('message', (message) => {
      console.log(`get: ${message}`);
      wsClient.send(`you say: ${message}`);
    });
    wsClient.on('close', () => {
      console.log('disconect');
    });
  });

  return wsServer;
}

export default createWSServer;
