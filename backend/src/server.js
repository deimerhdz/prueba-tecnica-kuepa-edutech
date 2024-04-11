import express from 'express';
import cors from 'cors';
import { connection } from './database/db.js';
import {createServer} from 'node:http';
import {router} from './routes/index.js';
import { Server  } from 'socket.io'
import { socketChatController } from './socket/socket-chat.js';
export default class ServerExpress{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = createServer( this.app );
        this.io = new Server(this.server,{
            cors: {
                origins: ['http://localhost:4200']
            }
        })
        this.middlewares()
        this.routes();
        this.conectDB();
      
        this.sockets();
    }
    async conectDB(){
        await connection();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
       this.app.use('/api',router);
    }
    sockets() {
        this.io.on('connection', ( socket ) => socketChatController(socket, this.io ) )
    }
    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}