import Room from './Room.js'

class Model {
  rooms
  MARKERS

  constructor() {
    this.rooms = []
    this.MARKERS = ['X', 'O']
  }

  getPosition(position) {
    const row = Math.floor(position / 3)
    const col = position % 3

    return { row, col }
  }

  availablePosition(room, position) {
    const { row, col } = position

    return room.board[row][col] === ' '
  }

  placeOnBoard(marker, room, position) {
    const { row, col } = position

    room.board[row][col] = marker
  }

  checkWin(room) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        room.board[i][0] !== ' ' &&
        room.board[i][0] === room.board[i][1] &&
        room.board[i][0] === room.board[i][2]
      ) {
        return room.board[i][0]
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        room.board[0][i] !== ' ' &&
        room.board[0][i] === room.board[1][i] &&
        room.board[0][i] === room.board[2][i]
      ) {
        return room.board[0][i]
      }
    }

    // Check diagonals
    if (
      room.board[0][0] !== ' ' &&
      room.board[0][0] === room.board[1][1] &&
      room.board[0][0] === room.board[2][2]
    ) {
      return room.board[0][0]
    }

    if (
      room.board[0][2] !== ' ' &&
      room.board[0][2] === room.board[1][1] &&
      room.board[0][2] === room.board[2][0]
    ) {
      return room.board[0][2]
    }

    // No win found
    return null
  }

  checkTie(room) {
    // Check if all cells are filled
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (room.board[i][j] === ' ') {
          // Found an empty cell, not a tie
          return false
        }
      }
    }

    // All cells are filled, and no winner
    return true
  }

  getResult(room, winnerMarker) {
    const result = { winner: null, loser: null }

    if (room.players[0].marker === winnerMarker) {
      result.winner = room.players[0]
      result.loser = room.players[1]
    } else {
      result.winner = room.players[1]
      result.loser = room.players[0]
    }

    return result
  }

  findAvailableRoom() {
    let room = { room: null, id: -1 }

    for (let index = 0; index < this.rooms.length; index++) {
      if (this.rooms[index].players.length < 2) {
        room.room = this.rooms[index]
        room.id = index
        break
      }
    }

    if (!room.room) room = this.createRoom()

    return room
  }

  createRoom() {
    const index = this.rooms.push(new Room()) - 1

    return { room: this.rooms[index], id: index }
  }

  getRoom(client) {
    return this.rooms[client.roomID]
  }

  addToRoom(client) {
    const { room, id } = this.findAvailableRoom()

    client.roomID = id
    client.marker = this.MARKERS[room.players.length]

    room.addPlayer(client)

    return room
  }

  removeFromRoom(client) {
    const room = this.rooms[client.roomID]
    const index = room.players.indexOf(client)

    console.log(`index: ${index}`)
    // console.log(room)

    if (index > -1) {
      room.players.splice(index, 1)
      console.log('Player removed from server.')
    }

    return room
  }

  removeRoom(room) {
    const index = this.rooms.indexOf(room)

    if (index > -1) {
      this.rooms.splice(index, 1)
      console.log('Room index: ' + index, ' removed from server.')
    }
  }

  emptyRoom(room) {
    while (room.players.length) {
      const player = room.players.pop()

      player.end()
    }

    room.reset()
  }

  getCurrentState(client) {
    const room = this.getRoom(client)

    return {
      board: room.board,
      marker: client.marker,
      myTurn: room.currentPlayer() === client ? true : false,
      turn: room.getTurnCount(),
    }
  }
}

export default new Model()
