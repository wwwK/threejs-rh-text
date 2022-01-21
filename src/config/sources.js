import model from '@/assets/models/logo.glb?url'
import normalMap from '@/assets/textures/normal.jpg?url'
import hdr from '@/assets/textures/hdr-2.hdr?url'

const sources = [
	{ type: 'gltf', name: 'model', path: model },
	{ type: 'texture', name: 'normalMap', path: normalMap },
	{ type: 'rgbe', name: 'hdr', path: hdr },
]

export default sources