import Sketch from '../Sketch.js'
import Resources from '../utils/Resources.js'
import Text from './Text.js'
import sources from '@/config/sources.js'

let instance = null

export default class World {
	constructor() {
		if (instance) return instance
		instance = this

		this.sketch = new Sketch()
		this.scene = this.sketch.scene
		this.resources = new Resources()

		this.resources.load(sources)

		this.resources.on('ready', () => {
			this.text = new Text()
			this.scene.add(this.text.mesh)
		})
	}

	update(elapsed) {

	}
}