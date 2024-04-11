import { Socket } from "socket.io";
import { verifyJWT } from "../utils/handle-token.js";

import * as MessageService from '../service/message.service.js'

export const socketChatController = async ( socket = new Socket(),io ) => {

    const user = await verifyJWT(socket.handshake.headers['token']);
    if ( !user ) {
        return socket.disconnect();
    }
    socket.join( user.id );
    socket.on('send-message', async(message) => {
     await MessageService.saveMessage(user,message);
        const messages = await MessageService.findAllMessages();
         io.emit('all-messages', {messages} );
    })

}



