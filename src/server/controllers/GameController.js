import Model from '../model/Model.js'
import Network from './Network.js'

class GameController {
  manageRoom(room) {
    // if the room is filled, start the game.
    if (room.isFull()) this.startGame(room)
    // Else, make the player wait for a player to join
    else this.waiting(room)
  }

  startGame(room) {
    room.flipCoin()

    room.players.forEach((player) => this.start(player))
  }

  onEndGame(room) {
    Model.emptyRoom(room)
  }

  waiting(room) {
    room.players.forEach((player) => this.roomNotReady(player))
  }

  updateRoom(room) {
    // Update players UI
    room.players.forEach((player) => this.update(player))

    // Check for winning or tie conditions
    const winnerMarker = Model.checkWin(room)
    const tie = Model.checkTie(room)

    // in case any of them happened, game ends
    if (winnerMarker) {
      this.onWin(room, winnerMarker)
      return this.onEndGame(room)
    }
    if (tie) {
      this.onTie(room)
      return this.onEndGame(room)
    }

    // case not, game continues
  }

  onWin(room, winnerMarker) {
    const { winner, loser } = Model.getResult(room, winnerMarker)

    this.win(winner)
    this.lose(loser)
  }

  onTie(room) {
    room.players.forEach((player) => this.tie(player))
  }

  // Internal methods
  start(client) {
    Network.send(client, {
      title: 'start',
      // package: Model.getCurrentState(client),
    })
  }

  update(client) {
    Network.send(client, {
      title: 'update',
      package: Model.getCurrentState(client),
    })
  }

  currentState(client) {
    Network.send(client, {
      title: 'currentState',
      package: Model.getCurrentState(client),
    })
  }

  roomNotReady(client) {
    Network.send(client, { title: 'roomNotReady' })
  }

  positionNotAllowed(client) {
    Network.send(client, { title: 'positionNotAllowed' })
  }
  win(client) {
    Network.send(client, { title: 'win' })
  }
  tie(client) {
    Network.send(client, { title: 'tie' })
  }
  lose(client) {
    Network.send(client, { title: 'lose' })
  }
  outOfTurn(client) {
    Network.send(client, { title: 'outOfTurn' })
  }

  invalidRequest(client) {
    Network.send(client, { title: 'invalidRequest' })
  }
}

export default new GameController()
