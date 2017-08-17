import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { renderTick, gameTick, keyDown, keyUp } from './actions/index'
import Root from './components/index'

const components = [Root]

const init = () => {
    var root = document.getElementById('root')
    var canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    root.appendChild(canvas)
    return canvas.getContext("2d")
}

var currentValue
const handleChange = (getState, context) => () => {
    const previousValue = currentValue
    currentValue = getState()

    if(currentValue !== previousValue) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        for(const componentInstance of componentInstances) {
            if(componentInstance.shouldComponentUpdate()) {
                const { canvas, x, y } = componentInstance.render(context)
                context.drawImage(canvas, Math.round(x), Math.round(y))
            }
        }
    }
}

var context = init()

var predicate = (getState, action) =>
    (action.type !== "RENDER_TICK" && action.type !== "GAME_TICK")

var logger = createLogger({predicate: predicate})
var store
if(process.env.NODE_ENV === "development") {
    store = createStore(rootReducer, applyMiddleware(logger))
} else {
    store = createStore(rootReducer)
}

const componentInstances = components.map(
    (component) => new component(store.getState))

var unsubscribe = store.subscribe(handleChange(store.getState, context))

const animationTicker = (timestamp) => {
    store.dispatch(renderTick())
    window.requestAnimationFrame(animationTicker)
}
window.requestAnimationFrame(animationTicker)

window.setInterval(() => {
    store.dispatch(gameTick())
}, 10)

window.onkeydown = (event) => store.dispatch(keyDown(event.key))
window.onkeyup = (event) => store.dispatch(keyUp(event.key))
