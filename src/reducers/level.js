import { pointsInCircle } from '../utils/random'
import { LEVEL_RADIUS, PLANET_RADIUS, PLATFORMS } from '../constants'
import { LEVEL_WIN } from '../actions'

const getDifficulty = (wins) => (
    wins + 4.0
)

const getPlanetRadius = (wins) => (
    PLANET_RADIUS
)

const getGoalRadius = (wins) => (
    LEVEL_RADIUS * getDifficulty(wins)
)

const generateLevel = (wins) => {
    const difficulty = getDifficulty(wins)
    return pointsInCircle(
        PLATFORMS,
        getGoalRadius(wins),
        getPlanetRadius(wins) ,
        80, false)
}

const defaultWins = 0

var defaultState = { level: generateLevel(defaultWins),
                     wins: defaultWins,
                     planetRadius: getPlanetRadius(defaultWins),
                     goalRadius: getGoalRadius(defaultWins) }

const level = (state = Object.assign({}, defaultState), action) => {
    switch(action.type) {
        case LEVEL_WIN:
            const newWins = state.wins + 1
            return Object.assign({}, state, {
                level: generateLevel(newWins),
                wins: newWins,
                planetRadius: getPlanetRadius(newWins),
                goalRadius: getGoalRadius(newWins)})

        default:
            return state
    }
}

export default level
