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

class Root extends Component {
    constructor(getState) {
        super(getState)
        this.context.fillStyle = "#007DFF"
        this.context.fillRect(0, 0, PLAYER_WIDTH, PLAYER_HEIGHT)
    }

    shouldCanvasUpdate(previousValue, currentValue) {
        return this.updateCanvas = false
    }

    shouldPositionUpdate(previousValue, currentValue) {
        if(previousValue === undefined) {
            return true
        }

        return this.updatePosition = (
            previousValue.player.posX !== currentValue.player.posX ||
            previousValue.player.posY !== currentValue.player.posY
        )
    }

    render() {
        const state = this.getState()
        return {
            canvas: this.context.canvas,
            x: state.player.posX - PLAYER_WIDTH/2,
            y: state.player.posY - PLAYER_HEIGHT/2
        }
    }
}

export default Root
