class Room {
  board
  players
  turn
  turnCount

  constructor() {
    this.board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]

    this.players = []
    this.turn = 0
    this.turnCount = 0
  }

  isFull() {
    return this.players.length === 2
  }

  flipCoin() {
    this.turn = Math.floor(Math.random() * 2)
    // this.turn = Math.floor(Math.random() * 2)

    // return {
    //   startPlayer: this.currentPlayer(),
    //   waitPlayer: this.turn === 0 ? this.players[0] : this.players[1],
    // }
  }

  reset() {
    this.board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]

    this.turn = 0
    this.turnCount = 0
  }

  getTurnCount() {
    return this.turnCount
  }

  currentPlayer() {
    return this.players[this.turn]
  }

  changePlayerTurn() {
    this.turn = this.turn === 1 ? 0 : 1

    this.turnCount++
  }

  nextPlayer() {
    const pos = this.turn === 0 ? 1 : 0

    return this.players[pos]
  }

  addPlayer(player) {
    this.players.push(player)
  }
}

export default Room
