import { RENDER_TICK, GAME_TICK, KEY_DOWN, KEY_UP, TOUCHES, LEVEL_WIN } from '../actions/index'
import { ACCELERATION, JUMP_ACCELERATION, JETPACK_ACCELERATION, RUN_ACCELERATION, FLY_ACCELERATION, GROUND_FRICTION, AIR_FRICTION, VELOCITY_LOSS, PLAYER_WIDTH, PLAYER_HEIGHT, PLATFORM_SIDE, PLANET_RADIUS, CAMERA_INERTIA, PLANET_MASS, SPEED_LIMIT, DOWN_CONSTANT } from '../constants.js'
import { normalize } from '../utils/trig'

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
    var verticalAcc = JETPACK_ACCELERATION * PLANET_MASS / Math.pow(posR, 2)
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
                accAngle += Math.atan(horizontalAcc / posR)
                break

            case "down":
                accR -= DOWN_CONSTANT
                break

            case "right":
                accAngle -= Math.atan(horizontalAcc / posR)
                break

            default:
                break
        }
    }

    accR -= PLANET_MASS / Math.pow(posR, 2)
    console.log(PLANET_MASS / Math.pow(posR, 2))

    return { r: accR, angle: accAngle }
}

const checkCollisions = (posR, posAngle, platforms) => {
    var sides = { up: false, left: false, down: false, right: false, almost: false }
    const playerWidthPlatform = PLAYER_WIDTH / 2 + PLATFORM_SIDE / 2
    const playerAnglePlatform = Math.atan(playerWidthPlatform / posR)
    const playerHeightPlatform = PLAYER_HEIGHT / 2 + PLATFORM_SIDE / 2
    for(const platform of platforms) {
        const radiusDiff = platform.r - posR
        const angleDiff = normalize(platform.angle - posAngle)

        sides.almost = sides.almost || (
            Math.abs(radiusDiff) < playerHeightPlatform + 1 &&
            Math.abs(angleDiff) < Math.atan((playerWidthPlatform - 3) / posR) &&
            radiusDiff < 0)

        if(Math.abs(radiusDiff) > playerHeightPlatform) {
            continue
        }
        if(Math.abs(angleDiff) > playerAnglePlatform) {
            continue
        }
        if(playerHeightPlatform - Math.abs(radiusDiff) <
            playerWidthPlatform - Math.abs(posR * Math.tan(angleDiff))
        ) {
            if(radiusDiff >= 0)
                sides.up = sides.up || Math.abs(radiusDiff) - playerHeightPlatform
            else
                sides.down = sides.down || playerHeightPlatform - Math.abs(radiusDiff)
        } else {
            if(angleDiff >= 0)
                sides.left = sides.left || Math.abs(angleDiff) - playerAnglePlatform
            else
                sides.right = sides.right || playerAnglePlatform - Math.abs(angleDiff)
        }
    }
    return sides
}

const player = (
    state = { keys: new Set(),
              velR: 0, velAngle: 0,
              posR: 3100, posAngle: Math.PI/2,
              cameraR: 3100, cameraAngle: Math.PI/2
    }, action, levelState
) => {
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
            const collisions = checkCollisions(state.posR, state.posAngle, levelState.level)
            const collidingIsh =
                (state.posR - PLAYER_HEIGHT / 2 - 1 < levelState.planetRadius) || collisions.almost
            const newAcc = calculateAcceleration(state.keys, state.posR, collidingIsh)

            var newVelR = Math.min(state.velR + newAcc.r, SPEED_LIMIT)
            if(collisions.up && state.velR > 0 || collisions.down && state.velR < 0) {
                newVelR = 0
            }
            var newPosR = state.posR + newVelR +
                          collisions.down + collisions.up

            if(state.posR - PLAYER_HEIGHT / 2 < levelState.planetRadius) {
                newPosR = levelState.planetRadius + PLAYER_HEIGHT / 2
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

            if(collisions.left && state.velAngle > 0 || collisions.right && state.velAngle < 0) {
                newVelAngle = 0
            }
            var newPosAngle = state.posAngle + newVelAngle +
                              collisions.left + collisions.right

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

        case LEVEL_WIN:
            return Object.assign({}, state, {
                posR: PLANET_RADIUS, cameraR: PLANET_RADIUS })

        default:
            return state
    }
}

export default player
