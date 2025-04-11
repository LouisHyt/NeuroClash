import app from "@adonisjs/core/services/app";
import { ExtendedError, Server, Socket } from "socket.io";
import server from "@adonisjs/core/services/server";
import GameSocketController from "#controllers/socket/game_socket_controller";
import GeneralSocketController from "#controllers/socket/general_socket_controller";
import qs from 'qs'
import { Request } from "@adonisjs/core/http";
import sessionConfig from "#config/session";
import Encryption from "@adonisjs/core/services/encryption";

app.ready(() => {
    const io = new Server(server.getNodeServer());

    const gameSocketController = new GameSocketController(io.of('/game'));
    const generalSocketController = new GeneralSocketController(io.of('/general'));

    io.of('/game').use(AuthMiddleware);
    io.of('/general').use(AuthMiddleware);

    io.of('/game').on("connection", (socket) => {
        console.log('\u001b[1;34m SocketIO :', `\u001b[0m New connection from user ${socket.data.userUuid} on Namespace 'Game'`);
        gameSocketController.handleConnection(socket)
    });

    io.of('/general').on('connection', (socket) => {
        console.log('\u001b[1;34m SocketIO :', `\u001b[0m New connection from user ${socket.data.userUuid} on Namespace 'General'`);
        generalSocketController.handleConnection(socket)
    })
});

async function AuthMiddleware(socket: Socket, next: (err?: ExtendedError) => void) {
    if(socket.data.userUuid) {
        return next();
    }

    // @ts-expect-error Response is null
    const SocketRequest = new Request(socket.request, null, Encryption, {}, qs)
    const sessionResolver = await sessionConfig.resolver(app);
    const sessionId = SocketRequest.cookie(sessionResolver.cookieName);
    if(!sessionId) {
        return next(new Error('Unauthorized'))
    }
    const session = SocketRequest.encryptedCookie(sessionId)
    if(!session || !session?.auth_web) {
        return next(new Error('Unauthorized'))
    }
    
    socket.data.userUuid = session.auth_web;
    next();
}