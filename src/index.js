import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

import './index.css'
import rootReducer from './reducers/index'
import { helloWorld } from './actions/index'
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
        for(const componentInstance of componentInstances) {
            if(componentInstance.shouldComponentUpdate()) {
                const { canvas, x, y } = componentInstance.render(context)
                context.drawImage(canvas, x, y)
            }
        }
    }
}

var context = init()
var store = createStore(rootReducer, applyMiddleware(logger))

const componentInstances = components.map(
    (component) => new component(store.getState))

var unsubscribe = store.subscribe(handleChange(store.getState, context))

store.dispatch(helloWorld())
