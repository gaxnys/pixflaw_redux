export const RENDER_TICK = 'RENDER_TICK'
export const renderTick = () => ({
    type: RENDER_TICK
})

export const GAME_TICK = 'GAME_TICK'
export const gameTick = (timestamp) => ({
    type: GAME_TICK,
    timestamp
})

export const KEY_DOWN = 'KEY_DOWN'
export const keyDown = (key) => ({
    type: KEY_DOWN,
    key
})

export const KEY_UP = 'KEY_UP'
export const keyUp = (key) => ({
    type: KEY_UP,
    key
})

export const TOUCHES = 'TOUCHES'
export const touches = (touches, windowWidth, windowHeight) => ({
    type: TOUCHES,
    touches,
    windowWidth,
    windowHeight
})

export const LEVEL_WIN = 'LEVEL_WIN'
export const levelWin = () => ({
    type: LEVEL_WIN
})
