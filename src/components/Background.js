import { Component } from './index'
import { POINTS } from '../constants'

class Background extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = 4000
        this.context.canvas.height = 4000
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, 4000, 4000)

        this.context.fillStyle = "#FFFFFF"
        for(var i = 0; i < POINTS; i += 1) {
            const posX = Math.round(Math.random()*4000)
            const posY = Math.round(Math.random()*4000)
            this.context.fillRect(posX, posY, 1, 1)
        }
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
            offsetX: 2000,
            offsetY: 2000
        }
    }
}

export default Background
