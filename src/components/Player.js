import { Component } from './index'
import constants from '../constants'

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
            this.context.translate(
                constants.PLAYER_WIDTH  * 2,
                constants.PLAYER_HEIGHT  * 2
            )
            this.context.rotate(state.player.posAngle)
            this.context.fillRect(
                - constants.PLAYER_HEIGHT / 2,
                - constants.PLAYER_WIDTH / 2,
                constants.PLAYER_HEIGHT,
                constants.PLAYER_WIDTH
            )
            this.context.restore()
        }
        return {
            canvas: this.context.canvas,
            angle: state.player.posAngle,
            r: state.player.posR,
            offsetX: constants.PLAYER_WIDTH * 2,
            offsetY: constants.PLAYER_HEIGHT * 2
        }
    }

    renderToContext(context, state) {
        const wins = state.level.wins
        context.save()
        context.fillStyle = "#007DFF"
        context.rotate(state.player.posAngle)
        context.translate(state.player.posR, 0)
        context.fillRect(
            - constants.PLAYER_HEIGHT / 2,
            - constants.PLAYER_WIDTH / 2,
            constants.PLAYER_HEIGHT,
            constants.PLAYER_WIDTH
        )
        context.fillStyle = "#FFFFFF"
        for(var i = 0; i < wins; i++) {
            var y = Math.floor(i / 2 + 1)
            var x = Math.floor(i % 2 + 1)
            context.fillRect(
                - constants.PLAYER_HEIGHT / 2 + constants.PLAYER_HEIGHT / 4 * y - 2,
                - constants.PLAYER_WIDTH / 2 + constants.PLAYER_WIDTH / 3 * x - 2,
                4,
                4
            )
        }
        context.restore()
    }
}

export default Player
