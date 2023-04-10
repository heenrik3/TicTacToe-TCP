import net from 'net'

import ClientController from './controllers/ClientController.js'

const parser = (data) => {
  try {
    const msg = data
      .toString()
      .split('\n')
      .filter((item) => item !== '')
      .pop()

    return JSON.parse(msg)
  } catch (error) {
    return null
  }
}

const client = net.connect({ port: 3000 }, () => {
  ClientController.handleConnected()

  client.on('data', (data) => {
    const parsedMsg = parser(data)

    if (parsedMsg) ClientController.handleData(client, parsedMsg)
    else console.log('Failed to parse JSON')
  })

  client.on('error', (err) => {
    ClientController.handleOnError(client, err)
  })

  client.on('end', () => ClientController.handleOnEnd(client))
})
