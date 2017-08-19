import { Component } from './index'
import { PLANET_RADIUS, LEVEL_RADIUS, PLATFORM_SIDE } from '../constants'
import { pointsInCircle } from '../utils/random'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = LEVEL_RADIUS * 2 + 100
        this.context.canvas.height = LEVEL_RADIUS * 2 + 100
        this.center = LEVEL_RADIUS + 50
        const numShapes = 1000
        this.points = pointsInCircle(numShapes, PLANET_RADIUS - 5)
        this.randoms = []
        for(var i = 0; i < this.points.length; i++) {
            this.randoms.push(Math.random())
        }

        this.context.canvas.width = 100
        this.context.canvas.height = 100
        //this.renderToContext(this.context, this.center, getState())
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

    renderToContext(context, state, center) {
        context.strokeStyle = "#999999"
        context.lineWidth = PLATFORM_SIDE
        for(const point of state.level.level) {
            const angleDiff = Math.tan(PLATFORM_SIDE / 2 / point.r)

            context.beginPath()
            context.arc(center, center, point.r,
                             point.angle - angleDiff,
                             point.angle + angleDiff)
            context.stroke()
        }

        context.fillStyle = "#666666"
        context.beginPath()
        context.arc(center, center, state.level.planetRadius, 0, 2 * Math.PI)
        context.fill()

        context.strokeStyle = "#00FF00"
        context.lineWidth = 10
        context.beginPath()
        context.arc(center, center, state.level.goalRadius, 0, 2 * Math.PI)
        context.stroke()

        for(var i = 0; i < this.points.length; i++) {
            const point = this.points[i]
            const random = this.randoms[i]

            context.fillStyle =
                "hsl(0, 0%, " + Math.round(random * 100) + "%)"
            context.fillRect(center + point.posX, center + point.posY, 5, 5)
        }
    }
}

export default Map
