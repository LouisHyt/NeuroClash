import { Socket, Namespace } from 'socket.io'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'

export default class GeneralSocketController {
  constructor(private io: Namespace) {}

  public handleConnection(socket: Socket) {
    socket.on('sendMessage', (data) => this.handleSendMessage(socket, data))
    socket.on('deleteMessage', (data) => this.handleDeleteMessage(socket, data))
  }

  private async handleSendMessage(socket: Socket, message: string) {
    const user = await User.findBy('uuid', socket.data.userUuid)
    if (!user) return
    this.io.emit('newChatMessage', {
      message,
      id: cuid(),
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
        isAdmin: user.isAdmin,
      },
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    })
  }

  private async handleDeleteMessage(socket: Socket, messageId: string) {
    const user = await User.findBy('uuid', socket.data.userUuid)
    if (!user || !user?.isAdmin) return
    this.io.emit('messageDeleted', messageId)
  }
}
