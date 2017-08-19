import { GAME_TICK } from '../actions'

const environment = (state = { scale: 1 }, action) => {
    switch(action.type) {
        case GAME_TICK:
            return Object.assign({}, state, { scale: action.scale })

        default:
            return state
    }
}

export default environment
