import { Component } from './index'
import constants from '../constants'
import { pointsInCircle } from '../utils/random'

class Map extends Component {
    constructor(getState) {
        super(getState)
        this.context.canvas.width = constants.LEVEL_RADIUS * 2 + 100
        this.context.canvas.height = constants.LEVEL_RADIUS * 2 + 100
        this.center = constants.LEVEL_RADIUS + 50
        const numShapes = 1000
        this.points = pointsInCircle(numShapes, constants.PLANET_RADIUS - 5)
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
        return {
            canvas: this.context.canvas,
            angle: 0,
            r: 0,
            offsetX: this.center,
            offsetY: this.center,
        }
    }

    renderToContext(context, state, scale) {
        renderPlatforms(context, state.level.level, scale)

        context.fillStyle = "#666666"
        context.beginPath()
        context.arc(0, 0, state.level.planetRadius * scale, 0, 2 * Math.PI)
        context.fill()

        context.strokeStyle = "#00FF00"
        context.lineWidth = 10
        context.beginPath()
        context.arc(0, 0, state.level.goalRadius * scale, 0, 2 * Math.PI)
        context.stroke()

        for(var i = 0; i < this.points.length; i++) {
            const point = this.points[i]
            const random = this.randoms[i]

            context.fillStyle =
                "hsl(0, 0%, " + Math.round(random * 100) + "%)"
            context.fillRect(
                point.getX() * scale,
                point.getY() * scale,
                5 * scale,
                5 * scale
            )
        }
    }
}

function renderPlatforms(context, level, scale) {
    context.fillStyle = "#999999"

    for(const point of level) {
        context.save()

        context.rotate(point.angle)
        context.fillRect((point.getRadius() - constants.PLATFORM_SIDE / 2) * scale,
                         - constants.PLATFORM_SIDE / 2 * scale,
                         constants.PLATFORM_SIDE * scale,
                         constants.PLATFORM_SIDE * scale)
        context.restore()
    }
}

export default Map
