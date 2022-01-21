import * as THREE from 'three'
import Sketch from '../Sketch.js'
import Resources from '../utils/Resources.js'
import Debug from '../utils/Debug.js'

const options = {
	enableSwoopingCamera: false,
	enableRotation: false,
	color: 0xffffff,
	metalness: 0,
	roughness: 0,
	transmission: 1,
	sheen: 2,
	sheenRoughness: 0.1,
	sheenColor: 0xffffff,
	ior: 1.8,
	reflectivity: 1,
	thickness: 3,
	envMapIntensity: 3,
	clearcoat: 0.18,
	clearcoatRoughness: 0.1,
	normalScale: 0,
	clearcoatNormalScale: 3,
	normalRepeat: 3,
	attenuationTint: 0xffffff,
	attenuationDistance: 0,

	lightIntensity: 5.025,

	bloomThreshold: 0.85,
	bloomStrength: 0.35,
	bloomRadius: 0.33,
}

let normalMapTexture

export default class Text {
	constructor() {
		this.sketch = new Sketch()
		this.scene = this.sketch.scene
		this.resources = new Resources()
		this.debug = new Debug()

		this.setMesh()
		this.setMaterial()
		this.setBg()

		this.setDebug()
	}

	setMesh() {
		this.mesh = this.resources.items['model'].scene.children[0]
		this.mesh.position.set(0, 0, 0)
		this.mesh.scale.set(.25, .25, .25)

		console.log(this.mesh)
	}

	setMaterial() {
		const directionalLight = new THREE.PointLight( 0xffffff, options.lightIntensity, 20 )
		directionalLight.position.set(0, -4, 6)
		this.scene.add(directionalLight)

		this.light = directionalLight

		const lightHelper = new THREE.PointLightHelper( directionalLight, 5 )
		// this.scene.add(lightHelper)

		// const hdrEquirect = new THREE.RGBELoader().load(
		// 	'src/empty_warehouse_01_2k.hdr',
		// 	() => {
		// 	  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
		// 	}
		//   );

		const hdrEquirect = this.resources.items['hdr']
		// hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
		hdrEquirect.mapping = THREE.EquirectangularRefractionMapping

		normalMapTexture = this.resources.items['normalMap']
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
			attenuationTint: options.attenuationTint,
			attenuationDistance: options.attenuationDistance,
		});

		this.mesh.castShadow = true
		this.mesh.receiveShadow = true

		// this.mesh.children.forEach(child => {
		// 	child.material = this.material
		// })

		this.mesh.material = this.material
	}

	setDebug() {
		if (!this.debug.active) return

		this.debug.ui.addColor(options, 'color').onChange((val) => {
			this.material.color.set(val)
		})
		
		this.debug.ui.add(options, 'roughness', 0, 1, 0.01).onChange((val) => {
			this.material.roughness = val
		})
		
		this.debug.ui.add(options, 'metalness', 0, 1, 0.01).onChange((val) => {
			this.material.metalness = val
		})
		
		this.debug.ui.add(options, 'transmission', 0, 1, 0.01).onChange((val) => {
			this.material.transmission = val
		})
		
		this.debug.ui.add(options, 'ior', 1, 2.33, 0.01).onChange((val) => {
			this.material.ior = val
		})
		
		this.debug.ui.add(options, 'reflectivity', 0, 1, 0.01).onChange((val) => {
			this.material.reflectivity = val
		})
		
		this.debug.ui.add(options, 'thickness', 0, 5, 0.1).onChange((val) => {
			this.material.thickness = val
		})
		
		this.debug.ui.add(options, 'envMapIntensity', 0, 3, 0.1).onChange((val) => {
			this.material.envMapIntensity = val
		})
		
		this.debug.ui.add(options, 'clearcoat', 0, 1, 0.01).onChange((val) => {
			this.material.clearcoat = val
		})
		
		this.debug.ui.add(options, 'clearcoatRoughness', 0, 1, 0.01).onChange((val) => {
			this.material.clearcoatRoughness = val
		})
		
		this.debug.ui.add(options, 'normalScale', 0, 5, 0.01).onChange((val) => {
			this.material.normalScale.set(val, val)
		})
		
		this.debug.ui.add(options, 'clearcoatNormalScale', 0, 5, 0.01).onChange((val) => {
			this.material.clearcoatNormalScale.set(val, val)
		})
		
		this.debug.ui.add(options, 'normalRepeat', 1, 4, 1).onChange((val) => {
			normalMapTexture.repeat.set(val, val)
		})

		this.debug.ui.add(options, 'lightIntensity', 0, 10, 0.001).onChange(v => {
			this.light.intensity = v
		})

		this.debug.ui.add(options, 'sheen', 0, 5, 0.001).onChange(v => {
			this.material.sheen = v
		})

		this.debug.ui.add(options, 'sheenRoughness', 0, 5, 0.001).onChange(v => {
			this.material.sheenRoughness = v
		})

		this.debug.ui.addColor(options, 'sheenColor').onChange((val) => {
			this.material.sheenColor = new THREE.Color(val)
		})
		
		  // this.debug.ui.addColor(options, 'attenuationTint').onChange((val) => {
		  //   this.material.attenuationTint.set(val)
		  // })
		
		  // this.debug.ui.add(options, 'attenuationDistance', 0, 1, 0.01).onChange((val) => {
		  //   this.material.attenuationDistance = val
		  // })
	}
	
	setBg() {
		const geometry = new THREE.PlaneBufferGeometry(80, 80, 1, 1)
		const material = new THREE.MeshStandardMaterial({
			color: 0x205399,
			// map: this.resources.items['bg'],
		})

		const plane = new THREE.Mesh(geometry, material)
		plane.position.z = -5
		this.scene.add(plane)
	}
}