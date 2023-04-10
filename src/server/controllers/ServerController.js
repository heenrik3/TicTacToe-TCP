import Model from '../model/Model.js'
import GameController from './GameController.js'
import UserController from './UserController.js'

class ServerController {
  handleOnData(client, data) {
    try {
      const action = JSON.parse(data)

      const msg = `[ACTION][${action.title}] from ${client.remoteAddress}:${client.remotePort}`
      console.log(msg)

      UserController.handleClientData(client, action)
    } catch (error) {
      console.log(error)
    }
  }

  handleOnEnd(client) {
    console.log('On End.')

    this.removeClient(client)
  }

  handleOnError(client, err) {
    this.removeClient(client)

    console.log(`Server Error: ${err.code}`, err)
  }

  handleOnConnection(newClient) {
    console.log(`[CLIENT] ${newClient.remoteAddress}:${newClient.remotePort}`)

    this.addNewClient(newClient)

    newClient.on('data', (data) => this.handleOnData(newClient, data))

    newClient.on('error', (err) => this.handleOnError(newClient, err))

    newClient.on('end', () => this.handleOnEnd(newClient))
  }

  addNewClient(client) {
    const room = Model.addToRoom(client)

    GameController.manageRoom(room)
  }

  removeClient(client) {
    Model.removeFromRoom(client)
  }
}

export default new ServerController()
