import { Component } from './index'
import { PLANET_RADIUS } from '../constants'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = PLANET_RADIUS * 3
        this.context.canvas.height = PLANET_RADIUS * 3
        this.context.fillStyle = "#666666"
        this.context.arc(PLANET_RADIUS * 3 / 2, PLANET_RADIUS * 3 / 2, PLANET_RADIUS, 0, 2 * Math.PI)
        this.context.fill()
    }

    shouldCanvasUpdate(previousValue, currentValue) {
        return this.updateCanvas = false
    }

    shouldPositionUpdate(previousValue, currentValue) {
        return this.updatePosition = false
    }

    render() {
        const state = this.getState()
        return {
            canvas: this.context.canvas,
            angle: 0,
            r: 0,
            offsetX: PLANET_RADIUS * 3 / 2,
            offsetY: PLANET_RADIUS * 3 / 2,
        }
    }
}

export default Map
