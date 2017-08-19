import { Component } from './index'
import { PLANET_RADIUS, LEVEL_RADIUS, PLATFORM_SIDE } from '../constants'
import { pointsInCircle } from '../utils/random'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = LEVEL_RADIUS * 2
        this.context.canvas.height = LEVEL_RADIUS * 2
        this.center = LEVEL_RADIUS

        const state = getState()
        this.context.strokeStyle = "#999999"
        this.context.lineWidth = PLATFORM_SIDE
        for(const point of state.level) {
            const angleDiff = Math.tan(PLATFORM_SIDE / 2 / point.r)

            this.context.beginPath()
            this.context.arc(this.center, this.center, point.r,
                             point.angle - angleDiff,
                             point.angle + angleDiff)
            this.context.stroke()
        }

        this.context.fillStyle = "#666666"
        this.context.beginPath()
        this.context.arc(this.center, this.center, PLANET_RADIUS, 0, 2 * Math.PI)
        this.context.fill()

        const numShapes = 1000
        const points = pointsInCircle(numShapes, PLANET_RADIUS - 5)
        for(const point of points) {
            this.context.fillStyle =
                "hsl(0, 0%, " + Math.round(Math.random() * 100) + "%)"
            this.context.fillRect(this.center + point.posX, this.center + point.posY, 5, 5)
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
            offsetX: this.center,
            offsetY: this.center,
        }
    }
}

export default Map
