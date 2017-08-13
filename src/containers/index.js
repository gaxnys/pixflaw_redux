var currentValue
const handleChange = (getState) => () => {
    const previousValue = currentValue
    currentValue = getState()

    if(currentValue !== previousValue) {
        console.log("I handled a change, yo!")
    }
}

export default handleChange
