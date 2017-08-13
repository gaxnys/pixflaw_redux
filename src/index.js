import { createStore } from 'redux'

import './index.css'

const init = () => {
    var root = document.getElementById('root')
    var canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    root.appendChild(canvas)
    return canvas.getContext("2d")
}

const rootReducer = (state = { hello: "world" }, action) => {
    switch(action.type) {
        case "HELLO_WORLD":
            return Object.assign({}, state, { hello: "Hello World!" })

        default:
            return state
    }
}

const helloWorld = () => ({
    type: "HELLO_WORLD"
})

var currentValue
const handleChange = (getState) => () => {
    const previousValue = currentValue
    currentValue = getState()

    if(currentValue !== previousValue) {
        console.log("I handled a change, yo!")
    }
}

var context = init()

var store = createStore(rootReducer)

var unsubscribe = store.subscribe(handleChange(store.getState, context))

store.dispatch(helloWorld())
