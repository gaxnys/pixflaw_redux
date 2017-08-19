import { Component } from './index'
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants'

class Player extends Component {
    shouldCanvasUpdate(previousValue, currentValue) {
        if(previousValue === undefined) {
            return true
        }

        return this.updateCanvas = (
            previousValue.player.posAngle !== currentValue.player.posAngle ||
            previousValue.player.posR !== currentValue.player.posR
        )
    }

    shouldPositionUpdate(previousValue, currentValue) {
        if(previousValue === undefined) {
            return true
        }

        return this.updatePosition = (
            previousValue.player.posAngle !== currentValue.player.posAngle ||
            previousValue.player.posR !== currentValue.player.posR ||
            previousValue.player.cameraAngle !== currentValue.player.cameraAngle ||
            previousValue.player.cameraR !== currentValue.player.cameraR
        )
    }

    render() {
        const state = this.getState()
        if(this.updateCanvas) {
            this.context.fillStyle = "#007DFF"
            const canvas = this.context.canvas
            this.context.clearRect(0, 0, canvas.width, canvas.height)
            this.context.save()
            this.context.translate(PLAYER_WIDTH  * 2,
                                   PLAYER_HEIGHT  * 2)
            this.context.rotate(state.player.posAngle)
            this.context.fillRect(- PLAYER_HEIGHT / 2,
                                - PLAYER_WIDTH / 2,
                                  PLAYER_HEIGHT,
                                  PLAYER_WIDTH)
            this.context.restore()
        }
        return {
            canvas: this.context.canvas,
            angle: state.player.posAngle,
            r: state.player.posR,
            offsetX: PLAYER_WIDTH * 2,
            offsetY: PLAYER_HEIGHT * 2
        }
    }

    renderToContext(context, state) {
        context.save()
        context.fillStyle = "#007DFF"
        context.rotate(state.player.posAngle)
        context.translate(state.player.posR, 0)
        context.fillRect(- PLAYER_HEIGHT / 2,
                            - PLAYER_WIDTH / 2,
                              PLAYER_HEIGHT,
                              PLAYER_WIDTH)
        context.restore()
    }
}

export default Player
