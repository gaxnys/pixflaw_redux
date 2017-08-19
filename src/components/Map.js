import { Component } from './index'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, 100, 100)
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
            x: 100,
            y: 100,
        }
    }
}

export default Map
