import { generateReachablePoint } from '../utils/random'
import constants from '../constants'
import { LEVEL_WIN, RESET_LEVEL } from '../actions'
import Point from '../models/point.js'

const getPlanetRadius = (wins) => (
    constants.PLANET_RADIUS
)

const getGoalRadius = (wins) => (
    constants.LEVEL_RADIUS * 1.5 ** wins
)

const generateLevel = (wins) => {
    const goalRadius = getGoalRadius(wins)
    var level = []
    for (var i = 0; i < 42; i++) {
        const sourcePoint = new Point(
            Math.random() * Math.PI * 2,
            constants.PLANET_RADIUS + 20
        )
        if (pointClearsLevel(sourcePoint, level)) {
            level.push(...generatePath(sourcePoint, goalRadius, level))
        }
    }
    return level
}

const generatePath = (sourcePoint, goalRadius, level) => {
    var path = [sourcePoint]
    var lastPoint = sourcePoint
    while (true) {
        var nextPoint = generateReachablePoint(lastPoint)
        if (nextPoint.getRadius() >= goalRadius) {
            break
        }
        if (pointClearsLevel(nextPoint, path)
            && pointClearsLevel(nextPoint, level)
           ) {
            path.push(nextPoint)
            lastPoint = nextPoint
        }
    }
    return path
}

const pointClearsLevel = (nextPoint, level) => {
    for (const point of level) {
        if (Math.abs(point.getX() - nextPoint.getX()) +
            Math.abs(point.getY() - nextPoint.getY()) < 100) {
            return false
        }
    }
    return true
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
