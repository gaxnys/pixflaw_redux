import { combineReducers } from 'redux'

import player from './player'
import background from './background'

const rootReducer = combineReducers({
    player,
    background,
})

export default rootReducer
