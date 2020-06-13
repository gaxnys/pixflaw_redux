import Point from '../models/point.js'
import constants from '../constants.js'

export const pointsInCircle = (
    numPoints, maxRadius, minRadius = 0, minDistance = 0) => {
        var points = []
        while(points.length < numPoints) {
            const angle = Math.random()*2*Math.PI
            const u = Math.random()
            const r = (u > 1) ? 2 - u : u
            const radius = r * (maxRadius - minRadius) + minRadius
            if(radius > minRadius) {
                const newPoint = new Point(angle, radius)
                var clear = true
                if(minDistance > 0) {
                    for(const point of points) {
                        if(Math.abs(point.getX() - newPoint.getX()) +
                           Math.abs(point.getY() - newPoint.getY()) < minDistance) {
                            clear = false
                            break
                        }
                    }
                }
                if(clear) {
                    points.push(newPoint)
                }
            }
        }
        return points
    }

export const generateReachablePoint = (
    sourcePoint
) => {
    const gravity = constants.PLANET_MASS / Math.pow(sourcePoint.getRadius(), 2)
    // Assuming a single tick of jump acceleration
    const velY = constants.JUMP_ACCELERATION

    const accX = constants.FLY_ACCELERATION
    const deltaPosX = accX * Math.pow(getTimeOfFlight(velY, gravity), 2) / 3
    const deltaAngle = Math.atan(deltaPosX / sourcePoint.getRadius())

    const randXFraction = Math.pow(Math.random(), 4) * Math.sign(Math.random() - 0.5)
    const randYFraction = Math.random()

    return new Point(
        sourcePoint.getAngle() + deltaAngle * randXFraction,
        sourcePoint.getRadius() +
            getMaxHeightForDeltaXFraction(velY, gravity, randXFraction) * randYFraction
    )
}

const getTimeOfFlight = (velY, gravity) => {
    return 2 * velY / gravity
}

const getMaxHeight = (velY, gravity) => {
    return Math.pow(velY, 2) / (2 * gravity)
}

const getMaxHeightForDeltaXFraction = (velY, gravity, deltaXFraction) => {
    const maxHeight = getMaxHeight(velY, gravity)
    if (Math.abs(deltaXFraction) < 0.5) {
        return maxHeight
    }
    return maxHeight * (1 - (Math.abs(deltaXFraction) - 0.5) * 2)
}
