import { Component } from './index'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = 3000
        this.context.canvas.height = 3000
        this.context.fillStyle = "#666666"
        this.context.arc(1500, 1500, 1200, 0, 2 * Math.PI)
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
            offsetX: 1500,
            offsetY: 1500,
        }
    }
}

export default Map
