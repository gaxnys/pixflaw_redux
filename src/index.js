import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { renderTick, gameTick, keyDown, keyUp, touches, levelWin } from './actions/index'
import Player from './components/Player'
import Map from './components/Map'
import Background from './components/Background'

const components = [Background, Map, Player]

const init = () => {
    var root = document.getElementById('root')
    var canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    window.onresize = (event) => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    root.appendChild(canvas)
    var context = canvas.getContext("2d")
    return context
}

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
            context.translate(0, -currentValue.player.cameraR)
            const rotation = -currentValue.player.cameraAngle + Math.PI / 2
            context.rotate(rotation)

            for(const componentInstance of componentInstances) {
                componentInstance.renderToContext(context, currentValue, 0)
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

var unsubscribe = store.subscribe(handleChange(store.getState, context))

const animationTicker = (timestamp) => {
    const state = store.getState()
    if(state.player.posR > state.level.goalRadius) {
        store.dispatch(levelWin())
    }
    store.dispatch(gameTick())
    window.requestAnimationFrame(animationTicker)
}
window.requestAnimationFrame(animationTicker)

window.onkeydown = (event) => store.dispatch(keyDown(event.key))
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
