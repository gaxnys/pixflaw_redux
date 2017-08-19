import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants'

export class Component {
    constructor(getState) {
        this.context = document.createElement('canvas').getContext("2d")
        this.getState = getState
        this.currentValue = undefined
        this.updateCanvas = false
        this.updatePosition = false
    }

    shouldComponentUpdate() {
        const previousValue = this.currentValue
        this.currentValue = this.getState()

        this.updateCanvas = this.shouldCanvasUpdate(
            previousValue, this.currentValue)
        this.updatePosition = this.shouldPositionUpdate(
            previousValue, this.currentValue)
        return this.updateCanvas || this.updatePosition
    }

    shouldCanvasUpdate(previousValue, currentValue) {
        return this.updateCanvas = previousValue !== currentValue
    }

    shouldPositionUpdate(previousValue, currentValue) {
        return this.updatePosition = previousValue !== currentValue
    }

    render() {
        throw "Component class shall not be instantiated directly"
    }
}

