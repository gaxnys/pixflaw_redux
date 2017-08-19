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

export default Player
