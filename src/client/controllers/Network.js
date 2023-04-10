class Network {
  send(client, data) {
    client.write(JSON.stringify(data))
  }
}

export default new Network()
