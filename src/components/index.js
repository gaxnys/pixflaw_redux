export class Component {
    constructor(getState) {
        this.context = document.createElement('canvas').getContext("2d")
        this.getState = getState
        this.currentValue = undefined
    }

    shouldComponentUpdate() {
        const previousValue = this.currentValue
        this.currentValue = this.getState()

        if(this.currentValue !== previousValue) {
            return true
        }
    }

    render() {
        throw "Component class shall not be instantiated directly"
    }
}

class Root extends Component {
    render() {
        const state = this.getState()
        const WIDTH = 20
        const HEIGHT = 30
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.context.fillStyle = "#007DFF"
        this.context.fillRect(0, 0, WIDTH, HEIGHT)
        return { canvas: this.context.canvas, x: state.player.posX - WIDTH/2, y: state.player.posY - HEIGHT/2 }
    }
}

export default Root
