export const normalize = (angle) => {
    if(angle > Math.PI) {
        return angle - 2 * Math.PI
    }
    if(angle < - Math.PI) {
        return angle + 2 * Math.PI
    }
    return angle
}
