import { RENDER_TICK, GAME_TICK, KEY_DOWN, KEY_UP, TOUCHES } from '../actions/index'
import { ACCELERATION, JUMP_ACCELERATION, RUN_ACCELERATION, FLY_ACCELERATION, GRAVITY, GROUND_FRICTION, AIR_FRICTION, VELOCITY_LOSS, PLAYER_HEIGHT, PLANET_RADIUS, CAMERA_INERTIA } from '../constants.js'

const keyToDirection = {
    "w": "up",
    "ArrowUp": "up",
    "a": "left",
    "ArrowLeft": "left",
    "s": "down",
    "ArrowDown": "down",
    "d": "right",
    "ArrowRight": "right",
    " ": "up",
}

const calculateAcceleration = (keys, posR, colliding) => {
    var accAngle = 0, accR = 0
    var verticalAcc = 0
    var horizontalAcc = FLY_ACCELERATION
    if(colliding) {
        verticalAcc = JUMP_ACCELERATION
        horizontalAcc = RUN_ACCELERATION
    }
    for(const key of keys){
        switch(key) {
            case "up":
                accR += verticalAcc
                break

            case "left":
                accAngle += Math.tan(horizontalAcc / posR)
                break

            case "down":
                break

            case "right":
                accAngle -= Math.tan(horizontalAcc / posR)
                break

            default:
                break
        }
    }

    accR -= GRAVITY

    return { r: accR, angle: accAngle }
}

const player = (state = { keys: new Set(),
                          velR: 0, velAngle: 0,
                          posR: 1100, posAngle: Math.PI/2,
                          cameraR: 1100, cameraAngle: Math.PI/2 }, action) => {
    var newKeys
    switch(action.type) {
        case KEY_DOWN:
            newKeys = new Set(state.keys)
            newKeys.add(keyToDirection[action.key])
            return Object.assign({}, state, { keys: newKeys })

        case KEY_UP:
            newKeys = new Set(state.keys)
            newKeys.delete(keyToDirection[action.key])
            return Object.assign({}, state, { keys: newKeys })

        case TOUCHES:
            newKeys = new Set()
            if(action.touches.length === 2) {
                newKeys.add("up")
            } else if(action.touches.length > 0) {
                if(action.touches[0].clientX > action.windowWidth / 2) {
                    newKeys.add("right")
                } else {
                    newKeys.add("left")
                }
            }
            return Object.assign({}, state, { keys: newKeys })

        case GAME_TICK:
            const collidingIsh = (state.posR - PLAYER_HEIGHT / 2 - 1 < PLANET_RADIUS)
            const newAcc = calculateAcceleration(state.keys, state.posR, collidingIsh)

            var newVelR = state.velR + newAcc.r
            var newPosR = state.posR + newVelR
            if(state.posR - PLAYER_HEIGHT / 2 < PLANET_RADIUS) {
                newPosR = PLANET_RADIUS + PLAYER_HEIGHT / 2
                newVelR = (newVelR < -VELOCITY_LOSS) ? -(newVelR+VELOCITY_LOSS) : 0
                newVelR = 0
            }

            const friction = collidingIsh ? GROUND_FRICTION : AIR_FRICTION

            var newVelAngle = state.velAngle + newAcc.angle

            const frictionAcc = Math.sign(-state.velAngle) * friction
            newVelAngle +=  Math.tan(frictionAcc / state.posR)

            if(Math.abs(newVelAngle) < Math.tan(friction / state.posR)) {
                newVelAngle = 0
            }
            var newPosAngle = state.posAngle + newVelAngle

            if(newPosAngle > 2 * Math.PI) {
                newPosAngle -= 2 * Math.PI
            } else if(newPosAngle < 0) {
                newPosAngle += 2 * Math.PI
            }

            const newCameraR = ((state.cameraR * CAMERA_INERTIA + newPosR) /
                (CAMERA_INERTIA + 1))

            var angleDiff = newPosAngle - state.cameraAngle
            if(angleDiff > Math.PI) {
                angleDiff -= 2 * Math.PI
            } else if(angleDiff < - Math.PI) {
                angleDiff += 2 * Math.PI
            }

            var newCameraAngle = state.cameraAngle + angleDiff / CAMERA_INERTIA
            if(newCameraAngle > 2 * Math.PI) {
                newCameraAngle -= 2 * Math.PI
            } else if(newCameraAngle < 0) {
                newCameraAngle += 2 * Math.PI
            }

            return Object.assign({}, state, {
                velAngle: newVelAngle, velR: newVelR,
                posAngle: newPosAngle, posR: newPosR,
                cameraAngle: newCameraAngle, cameraR: newCameraR,
            })

        default:
            return state
    }
}

export default player
