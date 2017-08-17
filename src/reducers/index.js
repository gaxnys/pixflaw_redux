import { combineReducers } from 'redux'

import { RENDER_TICK, GAME_TICK, KEY_DOWN, KEY_UP } from '../actions/index'

const calculateAcceleration = (keys) => {
    const ACCELERATION = 0.1
    var accX = 0, accY = 0
    for(const key of keys){
        switch(key) {
            case "w":
            case "ArrowUp":
            case " ":
                accY -= ACCELERATION
                break

            case "a":
            case "ArrowLeft":
                accX -= ACCELERATION
                break

            case "s":
            case "ArrowDown":
                accY += ACCELERATION
                break

            case "d":
            case "ArrowRight":
                accX += ACCELERATION
                break

            default:
                break
        }
    }
    return { x: accX, y: accY }
}

const player = (state = { keys: new Set(), velX: 0, velY: 0, posX: 100, posY: 100 }, action) => {
    var newKeys
    switch(action.type) {
        case KEY_DOWN:
            newKeys = new Set(state.keys)
            newKeys.add(action.key)
            return Object.assign({}, state, { keys: newKeys })

        case KEY_UP:
            newKeys = new Set(state.keys)
            newKeys.delete(action.key)
            return Object.assign({}, state, { keys: newKeys })

        case GAME_TICK:
            const newAcc = calculateAcceleration(state.keys)
            const newVelX = state.velX + newAcc.x
            const newVelY = state.velY + newAcc.y
            const newPosX = state.posX + newVelX
            const newPosY = state.posY + newVelY
            return Object.assign({}, state, {
                velX: newVelX, velY: newVelY, posX: newPosX, posY: newPosY })

        default:
            return state
    }
}

const rootReducer = combineReducers({
    player,
})

export default rootReducer
