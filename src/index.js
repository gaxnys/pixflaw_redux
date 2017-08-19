import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { renderTick, gameTick, keyDown, keyUp, touches } from './actions/index'
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
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.save()
            const canvas = context.canvas
            context.translate(canvas.width / 2, canvas.height)
            context.scale(1, -1)
            context.translate(0, -1000)
            const rotation = -currentValue.player.posAngle + Math.PI / 2
            context.rotate(rotation)
            for(const componentInstance of componentInstances) {
                const { canvas, angle, r, offsetX, offsetY } =
                    componentInstance.render(context)
                const x = r * Math.cos(angle)
                const y = r * Math.sin(angle)
                context.drawImage(
                    canvas, Math.round(x - offsetX), Math.round(y - offsetY))
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
    store.dispatch(renderTick())
    window.requestAnimationFrame(animationTicker)
}
window.requestAnimationFrame(animationTicker)

window.setInterval(() => {
    store.dispatch(gameTick(window.innerHeight))
}, 10)

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
