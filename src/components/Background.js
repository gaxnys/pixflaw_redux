import { Component } from './index'
import { POINTS, BACKGROUND_RADIUS } from '../constants'

class Background extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = 4000
        this.context.canvas.height = 4000
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, 4000, 4000)

        this.context.fillStyle = "#FFFFFF"
        for(var i = 0; i < POINTS; i++) {
            const angle = Math.random()*2*Math.PI
            const u = Math.random() + Math.random()
            const r = (u > 1) ? 2 - u : u
            const posX = Math.round(r * BACKGROUND_RADIUS * Math.cos(angle))
            const posY = Math.round(r * BACKGROUND_RADIUS * Math.sin(angle))
            this.context.fillRect(2000 + posX, 2000 + posY, 1, 1)
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
