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
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.context.fillStyle = "#007DFF"
        this.context.fillRect(state.count % 100, Math.floor(state.count / 100), 100, 100)
        return { canvas: this.context.canvas, x: 0, y: 0 }
    }
}

export default Root
