import { pointsInCircle } from '../utils/random'
import { PLANET_RADIUS } from '../constants'

var defaultState = pointsInCircle(1000, PLANET_RADIUS + 2000, PLANET_RADIUS, 80, false)

const level = (state = defaultState.slice(), action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default level
