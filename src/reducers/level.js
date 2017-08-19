import { pointsInCircle } from '../utils/random'
import { LEVEL_RADIUS, PLANET_RADIUS } from '../constants'

var defaultState = pointsInCircle(500, LEVEL_RADIUS, PLANET_RADIUS, 80, false)

const level = (state = defaultState.slice(), action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default level
