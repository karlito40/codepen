import { nodesMock } from '../data'

export default {
  getNodes () {
    const jsonNodes = localStorage.getItem('nodes') 
    return jsonNodes
      ? JSON.parse(jsonNodes)
      : nodesMock
  },

  saveNodes (nodes) {
    localStorage.setItem('nodes', JSON.stringify(nodes))
  }
}
