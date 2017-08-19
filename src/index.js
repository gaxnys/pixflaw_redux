import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { renderTick, gameTick, keyDown, keyUp, touches } from './actions/index'
import Player from './components/Player'
import Map from './components/Map'

const components = [Map, Player]

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
            context.translate(canvas.width / 2, canvas.height)
            const scale = Math.min(window.innerHeight / 9, window.innerWidth / 16) / 120
            context.scale(scale, -scale)
            context.translate(0, -currentValue.player.cameraR + context.canvas.height / 2)
            const rotation = -currentValue.player.cameraAngle + Math.PI / 2
            context.rotate(rotation)

            context.fillStyle = "#FFFFFF"
            for(const point of currentValue.background) {
                const x = point.r * Math.cos(point.angle)
                const y = point.r * Math.sin(point.angle)
                context.fillRect(Math.round(x), Math.round(y), 1, 1)
            }

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
    const scale = Math.min(window.innerHeight / 9, window.innerWidth / 16) / 120
    store.dispatch(gameTick())
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
