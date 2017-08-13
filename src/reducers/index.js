import { HELLO_WORLD } from '../actions/index'

const rootReducer = (state = { hello: "world" }, action) => {
    switch(action.type) {
        case HELLO_WORLD:
            return Object.assign({}, state, { hello: "Hello World!" })

        default:
            return state
    }
}

export default rootReducer
