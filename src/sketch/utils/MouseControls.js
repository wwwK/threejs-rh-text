import * as THREE from 'three'

export default class MouseControls {
	constructor({ canvas, viewport, camera } = {}) {
		this.canvas = canvas
		this.viewport = viewport
		this.camera = camera

		this.mouse = {
			x: 0,
			y: 0,
		}
		this.easing = 0.036

		this.handleMove = this.handleMove.bind(this)
		this.handleOut = this.handleOut.bind(this)

		this.canvas.addEventListener('pointermove', this.handleMove)
		this.canvas.addEventListener('pointerout', this.handleOut)
	}

	handleMove({ clientX, clientY }) {
		this.mouse.x = 2 * (2 * (clientX / window.innerWidth) - 1)
		this.mouse.y = 2.5 * (2 * (-clientY / window.innerHeight) + 1)
	}

	handleOut() {
		this.mouse.x = 0
		this.mouse.y = 0
	}

	update() {
		this.camera.position.x += (this.mouse.x - this.camera.position.x) * this.easing
		this.camera.position.y += (this.mouse.y - this.camera.position.y) * this.easing

		this.camera.lookAt(new THREE.Vector3(0, 0, 0))
	}
}