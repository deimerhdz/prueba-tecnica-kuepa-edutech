import 'dotenv/config'
import ServerExpress from './src/server.js'
const server = new ServerExpress();

server.listen();