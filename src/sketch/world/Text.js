import * as THREE from 'three'
import Resources from '../utils/Resources.js'
import Debug from '../utils/Debug.js'
import { text as options } from '../config/settings.js'

export default class Text {
	constructor() {
		this.resources = new Resources()
		this.debug = new Debug()

		this.setMaterial()
		this.setMesh()
		this.setDebug()
	}

	setMaterial() {
		const hdrEquirect = this.resources.items['hdr']
		// hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
		hdrEquirect.mapping = THREE.EquirectangularRefractionMapping

		const normalMapTexture = this.resources.items['normalMap']
		normalMapTexture.wrapS = THREE.RepeatWrapping;
		normalMapTexture.wrapT = THREE.RepeatWrapping;
		normalMapTexture.repeat.set(options.normalRepeat, options.normalRepeat)

		this.material = new THREE.MeshPhysicalMaterial({
			color: options.color,
			metalness: options.metalness,
			roughness: options.roughness,
			transmission: options.transmission,
			sheen: options.sheen,
			sheenRoughness: options.sheenRoughness,
			sheenColor: options.sheenColor,
			ior: options.ior,
			reflectivity: options.reflectivity,
			thickness: options.thickness,
			envMap: hdrEquirect,
			envMapIntensity: options.envMapIntensity,
			clearcoat: options.clearcoat,
			clearcoatRoughness: options.clearcoatRoughness,
			normalScale: new THREE.Vector2(options.normalScale),
			normalMap: normalMapTexture,
			clearcoatNormalMap: normalMapTexture,
			clearcoatNormalScale: new THREE.Vector2(options.clearcoatNormalScale),
			// attenuationTint: options.attenuationTint,
			attenuationDistance: options.attenuationDistance,
		})
	}

	setMesh() {
		this.mesh = this.resources.items['text'].scene.children[0]
		this.mesh.material = this.material
	}

	setDebug() {
		if (!this.debug.active) return

		const folder = this.debug.ui.addFolder('Text')

		folder.addColor(options, 'color').onChange((value) => {
			this.material.color.set(value)
		})
		
		folder.add(this.material, 'roughness', 0, 1, 0.01)
		folder.add(this.material, 'metalness', 0, 1, 0.01)
		folder.add(this.material, 'transmission', 0, 1, 0.01)
		folder.add(this.material, 'ior', 1, 2.333, 0.01)
		folder.add(this.material, 'reflectivity', 0, 1, 0.01)
		folder.add(this.material, 'thickness', 0, 5, 0.1)
		folder.add(this.material, 'envMapIntensity', 0, 6, 0.1)
		folder.add(options, 'normalScale', 0, 10, 0.01).onChange((value) => {
			this.material.normalScale.set(value, value)
		})
		folder.add(options, 'normalRepeat', 1, 5, 1).onChange((value) => {
			this.material.normalMap.repeat.set(value, value)
		})
		folder.add(this.material, 'clearcoat', 0, 1, 0.01)
		folder.add(this.material, 'clearcoatRoughness', 0, 1, 0.01)
		folder.add(options, 'clearcoatNormalScale', 0, 5, 0.01).onChange((value) => {
			this.material.clearcoatNormalScale.set(value, value)
		})

		folder.add(this.material, 'sheen', 0, 1, 0.01)
		folder.add(this.material, 'sheenRoughness', 0, 1, 0.01)
		folder.addColor(options, 'sheenColor').onChange((value) => {
			this.material.sheenColor = new THREE.Color(value)
		})
	}
}