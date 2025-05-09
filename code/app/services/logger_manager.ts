class LoggerManager {
  public room<T>(data: T): void {
    console.log('\u001b[1;32m Room : \u001b[0m', data)
  }

  public socket<T>(data: T): void {
    console.log('\u001b[1;34m SocketIO : \u001b[0m', data)
  }
}

export default new LoggerManager()
