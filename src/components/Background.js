import { Component } from './index'
import { pointsInCircle } from '../utils/random'
import { POINTS, BACKGROUND_RADIUS, PLANET_RADIUS } from '../constants'

class Background extends Component {
    constructor(getState) {
        super(getState)

        this.points = pointsInCircle(POINTS, BACKGROUND_RADIUS)
    }

    shouldCanvasUpdate(previousValue, currentValue) {
        return this.updateCanvas = false
    }

    shouldPositionUpdate(previousValue, currentValue) {
        return this.updatePosition = false
    }

    renderToContext(context, state) {
        context.fillStyle = "#FFFFFF"
        const r = state.player.cameraR * 0.9 - PLANET_RADIUS
        const angle = state.player.cameraAngle
        const offsetX = r * Math.cos(angle)
        const offsetY = r * Math.sin(angle)
        for(const point of this.points) {
            const posX = Math.round(point.r * Math.cos(point.angle) + offsetX)
            const posY = Math.round(point.r * Math.sin(point.angle) + offsetY)
            context.fillRect(posX, posY, 1, 1)
        }
    }
}

export default Background
