import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { gameTick, keyDown, keyUp, touches, levelWin, resetLevel } from './actions/index'
import Player from './components/Player'
import Map from './components/Map'

const components = [Map, Player]

const init = () => {
    var root = document.getElementById('root')
    var canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    scale = Math.min(canvas.width / 1920, canvas.height / 1080)

    window.onresize = (event) => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        scale = Math.min(canvas.width / 1920, canvas.height / 1080)
    }

    root.appendChild(canvas)
    var context = canvas.getContext("2d")
    return context
}
var scale = 1

var currentValue
const handleChange = (getState, context) => () => {
    const previousValue = currentValue
    currentValue = getState()

    if(currentValue !== previousValue) {
        const shouldUpdateCanvas = componentInstances.reduce(
            (shouldUpdate, componentInstance) =>
                (shouldUpdate || componentInstance.shouldComponentUpdate()),
            false)
        if(shouldUpdateCanvas) {
            context.fillStyle = "#000"
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            context.save()
            const canvas = context.canvas
            context.translate(canvas.width / 2, canvas.height / 2)
            context.scale(1, -1)
            context.translate(0, -currentValue.player.cameraR * scale)
            const rotation = -currentValue.player.cameraAngle + Math.PI / 2
            context.rotate(rotation)

            for(const componentInstance of componentInstances) {
                componentInstance.renderToContext(context, currentValue, scale)
            }

            context.restore()
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

const render = handleChange(store.getState, context)

const animationTicker = (timestamp) => {
    render()
    window.requestAnimationFrame(animationTicker)
}
window.requestAnimationFrame(animationTicker)

window.setInterval(() => {
    const state = store.getState()
    if(state.player.posR > state.level.goalRadius) {
        store.dispatch(levelWin())
    }
    store.dispatch(gameTick())
}, 10)

window.onkeydown = (event) => {
    if(event.key === "r") {
        store.dispatch(resetLevel())
    }
    store.dispatch(keyDown(event.key))
}
window.onkeyup = (event) => store.dispatch(keyUp(event.key))

document.body.addEventListener('touchstart', (event) => {
    event.preventDefault()
    store.dispatch(touches(event.touches, window.innerWidth, window.innerHeight))
}, { passive: false })

document.body.addEventListener('touchend', (event) => {
    event.preventDefault()
    store.dispatch(touches(event.touches, window.innerWidth, window.innerHeight))
}, { passive: false })

document.body.addEventListener('touchcancel', (event) => {
    event.preventDefault()
    store.dispatch(touches(event.touches, window.innerWidth, window.innerHeight))
}, { passive: false })
