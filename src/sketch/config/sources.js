import textModel from '../assets/models/text.glb?url'
import normalMap from '../assets/textures/normal.jpg?url'
import hdr from '../assets/textures/hdr-2.hdr?url'
import bg from '../assets/textures/bg.jpg?url'

const sources = [
	{ type: 'gltf', name: 'text', path: textModel },
	{ type: 'texture', name: 'normalMap', path: normalMap },
	{ type: 'rgbe', name: 'hdr', path: hdr },
	{ type: 'texture', name: 'bg', path: bg },
]

export default sources