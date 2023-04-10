import Model from '../model/Model.js'
import View from '../view/View.js'
import Network from './Network.js'

class GameController {
  connected() {
    View.welcome()
  }

  start(client) {
    this.getCurrentState(client)
    View.matchStarting()

    setTimeout(() => {
      const state = Model.getState()
      this.render()
      if (state.myTurn) this.getMarkerPosition(client)
    }, 4000)
  }

  render() {
    View.render(Model.getState())
  }

  getMarkerPosition(client) {
    View.getPosition((position) => {
      this.onPosition(client, position)
    })
  }

  roomNotReady() {
    View.roomNotReady()
  }

  positionNotAllowed() {
    View.positionNotAllowed()
  }

  onWin() {
    View.show('Voce venceu!')
  }
  onLose() {
    View.show('Voce perdeu!')
  }
  onTie() {
    View.show('Deu velha!')
  }
  onOutOfTurn() {
    View.show('Não é a sua vez!')
  }

  getCurrentState(client) {
    Network.send(client, { title: 'currentState' })
  }

  onPosition(client, position) {
    Network.send(client, { title: 'move', package: { position } })
  }
}

export default new GameController()
