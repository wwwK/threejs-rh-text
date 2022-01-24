import * as THREE from 'three'

export const background = {
	color: 0x305fa1,
	metalness: 0,
	roughness: 1,
}

export const text = {
	color: 0x23c5c7,
	metalness: 0.05,
	roughness: 0,
	transmission: 1,
	sheen: 2,
	sheenRoughness: 0.1,
	sheenColor: 0xffffff,
	ior: 2.333,
	reflectivity: 1,
	thickness: 3,
	envMapIntensity: 3,
	clearcoat: 1,
	clearcoatRoughness: 0.3,
	normalScale: 0,
	clearcoatNormalScale: 0,
	normalRepeat: 3,
	attenuationTint: 0xffffff,
	attenuationDistance: 0,
}

export const light = {
	color: new THREE.Color(0xffffff),
	// intensity: 5.25,
	intensity: 2.93,
	x: 0,
	y: -3.8,
	z: 3,
	distance: 11.8,
}