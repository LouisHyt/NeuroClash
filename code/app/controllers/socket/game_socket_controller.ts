import { Socket, Namespace } from 'socket.io'
import { roomManager } from '#services/room_manager';
import string from '@adonisjs/core/helpers/string'


export default class GameSocketController {

    constructor(private io: Namespace) {}

    public handleConnection(socket: Socket)
    {
        socket.on('joinGame', () => this.handleJoinGame(socket))
        socket.on('getGameStatus', (props) => this.handleGameStatus(socket, props))
        socket.on('disconnect', () => this.handleDisconnect(socket))
    }

    public handleJoinGame(socket: Socket)
    {
        let availableRoom = roomManager.findAvailableRoom()
        if (!availableRoom) {
            console.log("\u001b[1;32m Room : \u001b[0m No room found, created one");
            availableRoom = `gid${string.random(15)}`;
            roomManager.createRoom(availableRoom);
        }

        roomManager.addPlayerToRoom(availableRoom, socket.data.userUuid, socket.id);
        socket.join(availableRoom);

        const room = roomManager.getRoom(availableRoom);
        if (room && room?.players.length === 2) {
            console.log("\u001b[1;32m Room : \u001b[0m Room found! Joined and start game");
            this.io.to(availableRoom).emit('gameStart', {
                roomId: availableRoom
            })
            return
        }
        socket.emit('roomJoined', availableRoom)
    }

    public handleGameStatus(socket: Socket, gameId: string) {
        if(!gameId) return
        const playerRoom = roomManager.getRoom(gameId);
        this.io.to(socket.id).emit('gameStatus', playerRoom);
    }

    public handleDisconnect(socket: Socket) {
        console.log(`\u001b[1;32m Room : \u001b[0m Player ${socket.data.userUuid} disconnected`);
        const playerRoom = roomManager.findPlayerRoom(socket.data.userUuid);
        if (!playerRoom) return
        roomManager.deleteRoom(playerRoom);
        this.io.to(playerRoom).emit('playerDisconnected', socket.data.userUuid);
    }
   
}