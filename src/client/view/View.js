import readline from 'readline'

class View {
  render(state) {
    console.clear()
    console.log('Jogo da Velha!')
    console.log(`Seu marcador: ${state.marker}`)

    console.log(`Turno: ${state.turn}`)
    console.log('')

    this.printBoard(state.board)

    if (!state.myTurn) this.waitingPlayerPlay()
  }

  getPosition(handler) {
    console.log('Informe a posicao: ')

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    })

    rl.on('line', (input) => {
      const position = +input

      if (position >= 1 && position <= 9) {
        handler(position - 1)
        rl.close()
      }
    })
  }

  show(msg) {
    console.log(msg)
  }

  positionNotAllowed() {
    console.log('Posicao não permitida.')
  }
  waitingPlayerPlay() {
    console.log('Espere o outro jogador jogar.')
  }

  matchStarting(marker) {
    // console.log(`Seu marcador é ${marker}`)

    console.log('Partida começando em ')

    setTimeout(() => {
      console.log('3')
      setTimeout(() => {
        console.log('2')
        setTimeout(() => {
          console.log('1')
        }, 1000)
      }, 1000)
    }, 1000)
  }

  playerStarts() {
    console.log('Voce inicia jogando.')
  }
  printBoard(board) {
    console.log(` ${board[0][0]} | ${board[0][1]} | ${board[0][2]}   1 | 2 | 3`)
    console.log(`---+---+---  ---+---+---`)
    console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]}   4 | 5 | 6`)
    console.log(`---+---+---  ---+---+---`)
    console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]}   7 | 8 | 9`)
    console.log('\n')
  }

  welcome() {
    console.clear()
    console.log('Bem vindo ao Jogo!!')
  }

  roomNotReady() {
    console.log('Voce está na sala esperando mais um jogador entrar!')
  }

  playing() {
    console.log('2 Jogadores agora!')
  }
}

export default new View()
