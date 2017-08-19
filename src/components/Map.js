import { Component } from './index'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = 2000
        this.context.canvas.height = 1000
        this.context.fillStyle = "#666666"
        this.context.arc(1000, -1000, 1200, 0, Math.PI)
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
            x: -1000,
            y: 1000,
        }
    }
}

export default Map
