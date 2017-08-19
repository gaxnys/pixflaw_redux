import { POINTS, BACKGROUND_RADIUS } from '../constants'

var defaultState = []
for(var i = 0; i < POINTS; i++) {
    const angle = Math.random()*2*Math.PI
    const u = Math.random() + Math.random()
    const r = (u > 1) ? 2 - u : u
    defaultState.push({r: r * BACKGROUND_RADIUS, angle: angle})
}

const background = (state = defaultState.slice(), action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default background
