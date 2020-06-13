import { pointsInCircle } from '../utils/random'
import constants from '../constants'
import { LEVEL_WIN, RESET_LEVEL } from '../actions'

const getPlanetRadius = (wins) => (
    constants.PLANET_RADIUS
)

const getGoalRadius = (wins) => (
    constants.LEVEL_RADIUS * 1.5 ** wins
)

const generateLevel = (wins) => {
    return pointsInCircle(
        constants.PLATFORMS,
        getGoalRadius(wins),
        getPlanetRadius(wins),
        60, false)
}

const defaultWins = 0

var defaultState = { level: generateLevel(defaultWins),
                     wins: defaultWins,
                     planetRadius: getPlanetRadius(defaultWins),
                     goalRadius: getGoalRadius(defaultWins) }

const level = (state = Object.assign({}, defaultState), action) => {
    var newWins = state.wins
    if (action.type === LEVEL_WIN) {
        newWins += 1
    }
    if (action.type === LEVEL_WIN || action.type === RESET_LEVEL) {
        return Object.assign({}, state, {
                level: generateLevel(newWins),
                wins: newWins,
                planetRadius: getPlanetRadius(newWins),
            goalRadius: getGoalRadius(newWins)})
    }

    return state
}

export default level
