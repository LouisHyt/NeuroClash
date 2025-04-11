import { Socket, Namespace } from 'socket.io'

export default class GeneralSocketController {

    constructor(private io: Namespace) {}

    public handleConnection(socket: Socket) {
        //socket.on('findGame', () => this.handleFindGame(socket))
    }
   
}