const initialState = {

    token : null

}

const chatReducer = (state = initialState, actions) => {

    if(actions.type === 'SET_TOKEN') {
        return {
            token : actions.token
        }
    }

    return state

}

export default chatReducer