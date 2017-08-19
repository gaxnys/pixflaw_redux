import { Component } from './index'
import { pointsInCircle } from '../utils/random'
import { POINTS, BACKGROUND_RADIUS, PLANET_RADIUS } from '../constants'

class Background extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = 4000
        this.context.canvas.height = 4000
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, 4000, 4000)

        const points = pointsInCircle(POINTS, BACKGROUND_RADIUS)
        this.context.fillStyle = "#FFFFFF"
        for(const point of points) {
            const posX = Math.round(point.r * Math.cos(point.angle))
            const posY = Math.round(point.r * Math.sin(point.angle))
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
            angle: state.player.cameraAngle,
            r: state.player.cameraR * 0.9 - PLANET_RADIUS,
            offsetX: 2000,
            offsetY: 2000,
        }
    }
}

export default Background
