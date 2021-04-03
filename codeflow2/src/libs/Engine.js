export default {
  mapElement: new Map(),

  register (displayObject) {
    if (displayObject.id) {
      this.mapElement.set(displayObject.id, displayObject)
    }
  },

  getElementById (id) {
    return this.mapElement.get(id)
  }
}