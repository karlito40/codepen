/* eslint-disable no-unused-vars */
export default {
  create (displayObjet, {
    onDragStart = () => {},
    onDragMove = () => {},
    onDragEnd = (displayObjet) => {},
  } = {}) {
    displayObjet.buttonMode = true
    displayObjet.interactive = true

    const dragEnd = () => {
      displayObjet.$dragData = null
      displayObjet.lastPosition = null
      onDragEnd(displayObjet)
    }

    displayObjet
      .on('pointerdown', (event) => {
        displayObjet.$dragData = event.data
        displayObjet.lastPosition = event.data.getLocalPosition(displayObjet.parent)
        onDragStart()
      })
      .on('pointermove', () => {
        if (!displayObjet.lastPosition) return
        const newPosition = displayObjet.$dragData.getLocalPosition(displayObjet.parent)
        displayObjet.position.x += newPosition.x - displayObjet.lastPosition.x
        displayObjet.position.y += newPosition.y - displayObjet.lastPosition.y
        displayObjet.lastPosition = newPosition
        onDragMove()
      })
      .on('pointerup', dragEnd)
      .on('pointerupoutside', dragEnd)
  }
}
