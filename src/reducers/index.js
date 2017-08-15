import { HELLO_WORLD, RENDER_TICK } from '../actions/index'

const rootReducer = (state = { hello: "world", count: 0 }, action) => {
    switch(action.type) {
        case HELLO_WORLD:
            return Object.assign({}, state, { hello: "Hello World!" })

        case RENDER_TICK:
            return Object.assign({}, state, { count: state.count + 1 })

        default:
            return state
    }
}

export default rootReducer
