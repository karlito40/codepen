
export default function getBounds (displayObject) {
	return {
		left: displayObject.x,
		right: displayObject.x + displayObject.width,
		top: displayObject.y,
		bottom: displayObject.y + displayObject.height,
		height: displayObject.height,
		centerX: displayObject.x + displayObject.width / 2,
		centerY: displayObject.y + displayObject.height / 2,
	}
}
