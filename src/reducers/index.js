import { GAME_TICK } from '../actions'
import player from './player'
import level from './level'

const rootReducer = (state = {} , action) => {
    switch(action.type) {
        case GAME_TICK:
            return {
                player: player(state.player, action, state.level),
                level: level(state.level, action)
            }

        default:
            return {
                player: player(state.player, action),
                level: level(state.level, action)
            }
    }
}

export default rootReducer
