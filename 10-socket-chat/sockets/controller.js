import {Socket} from 'socket.io'
import { comprobarJWT } from '../helpers/generar-jwt.js'
import { ChatMensajes } from '../models/chat-mensajes.js'

const chatMensajes = new ChatMensajes()

const socketController = async(socket = new Socket(), io) =>{
    // console.log(socket.handshake.headers['x-token']);

    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])
    if(!usuario){
        return socket.disconnect()
    }

    //agregando el usuario conectado
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)


    //Limpiar cuando algien se desconecta
    socket.on('disconnect',()=>{
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

}

export{
    socketController
}