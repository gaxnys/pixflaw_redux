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

    renderToContext(context, state) {
        context.fillStyle = "#FFFFFF"
        const r = state.player.cameraR * 0.9 - PLANET_RADIUS
        const angle = state.player.cameraAngle
        for(const point of this.points) {
            const posX = Math.round(point.r * Math.cos(point.angle) +
                                    r * Math.cos(angle))
            const posY = Math.round(point.r * Math.sin(point.angle) +
                                    r * Math.sin(angle))
            context.fillRect(posX, posY, 1, 1)
        }
    }
}

export default Background
