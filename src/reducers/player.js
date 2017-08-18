import { RENDER_TICK, GAME_TICK, KEY_DOWN, KEY_UP, TOUCHES } from '../actions/index'
import { ACCELERATION, JUMP_ACCELERATION, RUN_ACCELERATION, FLY_ACCELERATION, GRAVITY, GROUND_FRICTION, AIR_FRICTION, VELOCITY_LOSS, PLAYER_HEIGHT } from '../constants.js'

const calculateAcceleration = (keys, colliding) => {
    var accX = 0, accY = 0
    var verticalAcc = 0
    var horizontalAcc = FLY_ACCELERATION
    if(colliding) {
        verticalAcc = JUMP_ACCELERATION
        horizontalAcc = RUN_ACCELERATION
    }
    for(const key of keys){
        switch(key) {
            case "w":
            case "ArrowUp":
            case " ":
                accY -= verticalAcc
                break

            case "a":
            case "ArrowLeft":
                accX -= horizontalAcc
                break

            case "s":
            case "ArrowDown":
                break

            case "d":
            case "ArrowRight":
                accX += horizontalAcc
                break

            default:
                break
        }
    }

    accY += GRAVITY

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

        case TOUCHES:
            newKeys = new Set()
            if(action.touches.length === 2) {
                newKeys.add("w")
            } else if(action.touches.length === 1) {
                if(action.touches[0].clientX > action.windowWidth / 2) {
                    newKeys.add("d")
                } else {
                    newKeys.add("a")
                }
            }
            return Object.assign({}, state, { keys: newKeys })

        case GAME_TICK:
            const collidingIsh = (state.posY + 1 > action.windowHeight - PLAYER_HEIGHT / 2)
            const newAcc = calculateAcceleration(state.keys, collidingIsh)

            console.log(collidingIsh ? "colliding" : "not colliding")

            var newVelY = state.velY + newAcc.y
            var newPosY = state.posY + newVelY
            if(state.posY > action.windowHeight - PLAYER_HEIGHT / 2) {
                newPosY = action.windowHeight - PLAYER_HEIGHT / 2
                newVelY = (newVelY > VELOCITY_LOSS) ? -(newVelY-VELOCITY_LOSS) : 0
            }

            const friction = collidingIsh ? GROUND_FRICTION : AIR_FRICTION

            var newVelX = state.velX + newAcc.x

            const frictionAcc = Math.sign(-state.velX) * friction
            newVelX += frictionAcc

            if(Math.abs(newVelX) < friction ) {
                newVelX = 0
            }
            const newPosX = state.posX + newVelX

            return Object.assign({}, state, {
                velX: newVelX, velY: newVelY, posX: newPosX, posY: newPosY })

        default:
            return state
    }
}

export default player
