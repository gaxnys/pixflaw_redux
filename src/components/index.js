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
        this.context.fillStyle = "#007DFF"
        this.context.fillRect(0, 0, 100, 100)
        return { canvas: this.context.canvas, x: 0, y: 0 }
    }
}

export default Root
