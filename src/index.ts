import { env } from 'node:process';
import httpServer from './servers/http-server';

const HTTP_PORT = Number(env.HTTP_PORT) || 8181;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server at http://localhost:${HTTP_PORT}`);
