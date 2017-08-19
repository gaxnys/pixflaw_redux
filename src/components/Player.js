import { Component } from './index'
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants'

class Player extends Component {
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
            previousValue.player.posAngle !== currentValue.player.posAngle ||
            previousValue.player.posR !== currentValue.player.posR
        )
    }

    render() {
        const state = this.getState()
        return {
            canvas: this.context.canvas,
            x: state.player.posR * Math.cos(state.player.posAngle) - PLAYER_WIDTH / 2,
            y: state.player.posR * Math.sin(state.player.posAngle) - PLAYER_HEIGHT / 2
        }
    }
}

export default Player
