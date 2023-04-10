class Network {
  send(client, data) {
    client.write(JSON.stringify(data) + '\n')
  }
}

export default new Network()
