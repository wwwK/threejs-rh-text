import * as THREE from 'three'
import Resources from '../utils/Resources.js'
import Viewport from '../utils/Viewport.js'
import Debug from '../utils/Debug.js'
import { background as options } from '../config/settings.js'

export default class Background {
	constructor() {
		this.resources = new Resources()
		this.viewport = new Viewport()
		this.debug = new Debug()

		this.createTexture()
		this.setMaterial()
		this.setMesh()
		this.setDebug()
	}

	createTexture() {
		const canvas = document.createElement('canvas')
		const W = 1024 * this.viewport.pixelRatio
		const H = 1024 * this.viewport.pixelRatio
		canvas.width = W
		canvas.height = H
		const ctx = canvas.getContext('2d')

		const gradient = ctx.createLinearGradient(W / 3, H, W, 0)
		gradient.addColorStop(0, '#FFF');
		gradient.addColorStop(.5, '#305fa1');

		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, W, H)

		this.texture = new THREE.CanvasTexture(canvas)
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			map: this.texture,
			// color: options.color,
			metalness: options.metalness,
			roughness: options.roughness,
		})
	}

	setMesh() {
		this.geometry = new THREE.PlaneBufferGeometry(50, 50, 50, 50)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.z = -5
	}

	setDebug() {
		if (!this.debug.active) return

		const folder = this.debug.ui.addFolder('Background')

		folder.addColor(options, 'color').onChange(value => {
			this.material.color.set(value)
		})
		folder.add(this.material, 'metalness', 0, 1, 0.001)
		folder.add(this.material, 'roughness', 0, 1, 0.001)
	}
}