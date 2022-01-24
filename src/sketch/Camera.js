import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MouseControls from './utils/MouseControls.js'
import Sketch from './Sketch.js'

export default class Camera {
	constructor() {
		this.sketch = new Sketch()
		this.viewport = this.sketch.viewport
		this.scene = this.sketch.scene
		this.canvas = this.sketch.canvas

		this.setInstance()
		this.setOrbitControls()
		this.setMouseControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(50, this.viewport.width / this.viewport.height, .1, 100)
		// this.instance.lookAt(new THREE.Vector3(0, 0, 0))
		// this.instance.position.set(0, 0, 3.2)
		this.instance.position.set(0, 0, 0)
		this.scene.add(this.instance)
	}

	setOrbitControls() {
		this.orbitControls = new OrbitControls(this.instance, this.canvas)
		this.orbitControls.enableDamping = true
	}

	setMouseControls() {
		this.mouseControls = new MouseControls({
			viewport: this.viewport,
			canvas: this.canvas,
			camera: this.instance,
		})
	}

	fitTo(object, offset = 1) {
		const box = new THREE.Box3().setFromObject(object)
		const size = box.getSize(new THREE.Vector3())

		let distance = size.x / (2 * Math.atan(Math.PI * this.instance.fov / 360))
		distance /= this.instance.aspect
		distance *= offset

		this.instance.position.z = distance
	}

	resize() {
		this.instance.aspect = this.viewport.width / this.viewport.height
		this.instance.updateProjectionMatrix()
	}

	update(elapsed, delta) {
		this.orbitControls.update()
		this.mouseControls.update(elapsed, delta)
	}
}