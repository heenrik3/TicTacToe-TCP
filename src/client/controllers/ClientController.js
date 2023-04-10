import Model from '../model/Model.js'
import GameController from './GameController.js'

class ClientController {
  actions
  constructor() {
    this.actions = {
      currentState: (data) => {
        const { action } = data
        Model.setState(action.package)
      },
      update: (data) => {
        const { client, action } = data

        Model.setState(action.package)

        GameController.render()

        if (Model.getState().myTurn) GameController.getMarkerPosition(client)
      },
      start: (data) => {
        const { client } = data

        GameController.start(client)
      },
      roomNotReady: (data) => {
        GameController.roomNotReady()
      },
      positionNotAllowed: (data) => {
        GameController.positionNotAllowed()
      },
      win: (data) => {
        GameController.onWin()
      },
      lose: (data) => {
        GameController.onLose()
      },
      tie: (data) => {
        GameController.onTie()
      },
      outOfTurn: (data) => {
        GameController.onOutOfTurn()
      },
    }
  }

  handleConnected() {
    GameController.connected()
  }

  handleData(client, action) {
    try {
      const data = { client, action }

      this.actions[action.title](data)
    } catch (error) {
      console.log('REQUEST ERROR: ', error)
    }
  }

  handleOnError(client, err) {
    console.log('ON ERROR: ', err)
  }

  handleOnEnd(client) {
    console.log('ON END')
  }
}

export default new ClientController()
