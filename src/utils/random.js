export const pointsInCircle = (
    numPoints, maxRadius, minRadius = 0, minDistance = 0, uniform = true) => {
        var points = []
        while(points.length < numPoints) {
            const angle = Math.random()*2*Math.PI
            var u
            if(uniform) {
                u = Math.random() + Math.random()
            } else {
                u = Math.pow(Math.random(), 2)
            }
            const r = (u > 1) ? 2 - u : u
            const radius = r * maxRadius
            if(radius > minRadius) {
                const posX = Math.round(radius * Math.cos(angle))
                const posY = Math.round(radius * Math.sin(angle))

                var clear = true
                if(minDistance > 0) {
                    for(const point of points) {
                        if(Math.abs(point.posX - posX) +
                           Math.abs(point.posY - posY) < minDistance) {
                            clear = false
                            break
                        }
                    }
                }
                if(clear) {
                    points.push({ angle: angle, r: radius, posX: posX, posY: posY})
                }
            }
        }
        return points
    }
