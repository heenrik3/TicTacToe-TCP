class Model {
  state

  setState(state) {
    this.state = { ...state }
  }

  getState() {
    return this.state
  }

  getMarker() {
    return this.state.marker
  }
}

export default new Model()
