import { env } from 'node:process';
import httpServer from './servers/http-server';
import createWSServer from './servers/ws-server';

const HTTP_PORT = Number(env.HTTP_PORT) || 8181;
const WebS_PORT = Number(env.WS_PORT) || 3000;

console.log(`Start static http server at http://localhost:${HTTP_PORT}`);
const WSServer = createWSServer(WebS_PORT);
httpServer.listen(HTTP_PORT);

async function handleClose() {
  console.log('Servers are shutting down');
  httpServer.close();
  WSServer.close();
  process.exit(0);
}

process.on('SIGINT', async () => {
  await handleClose();
});
