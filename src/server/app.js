import net from 'net'
import ServerController from './controllers/ServerController.js'

const PORT = 3000
const server = net.createServer()

server.on(
  'connection',
  ServerController.handleOnConnection.bind(ServerController)
)
server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}...`))
