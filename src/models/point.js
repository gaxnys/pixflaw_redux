class Point {
    constructor(angle, radius) {
        this.angle = angle
        this.radius = radius
    }

    getAngle() {
        return this.angle
    }

    getRadius() {
        return this.radius
    }

    getX() {
        if (this.posX === undefined) {
            this.posX = Math.round(this.radius * Math.cos(this.angle))
        }
        return this.posX
    }

    getY() {
        if (this.posY === undefined) {
            this.posY = Math.round(this.radius * Math.sin(this.angle))
        }
        return this.posY
    }
}

export default Point
