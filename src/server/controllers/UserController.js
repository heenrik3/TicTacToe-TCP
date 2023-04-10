import Model from '../model/Model.js'
import GameController from './GameController.js'

class UserController {
  actions

  constructor() {
    this.actions = {
      move: (client, data) => {
        // Get the user room
        const room = Model.getRoom(client)

        // Check if is actually this player's turn
        if (room.currentPlayer() !== client)
          return GameController.outOfTurn(client)

        // Parse the position that was passed
        const position = Model.getPosition(data.position)

        // Check if the position is valid and change current room turn
        if (Model.availablePosition(room, position)) {
          Model.placeOnBoard(client.marker, room, position)
          room.changePlayerTurn()
        } else {
          GameController.positionNotAllowed(client)
        }

        // Update room for the players
        GameController.updateRoom(room)
      },
      currentState: (client) => {
        GameController.currentState(client)
      },

      invalid: (client) => {
        GameController.invalidRequest(client)
      },
    }
  }

  handleClientData(client, action) {
    try {
      // Check if the data passed by the client is valid
      if (
        typeof action.title === 'string' &&
        this.actions.hasOwnProperty(action.title) &&
        typeof this.actions[action.title] === 'function'
      ) {
        this.actions[action.title](client, action.package)
      } else throw new Error('Invalid action')
    } catch (error) {
      console.log('REQUEST ERROR: ', error)

      this.invalid(client)
    }
  }
}

export default new UserController()
