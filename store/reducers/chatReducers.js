const initialState = {

    token : null,
    users : []

}

const chatReducer = (state = initialState, actions) => {

    if(actions.type === 'SET_TOKEN') {
        return {
            ...state,
            token : actions.token
        }
    }
    if(actions.type === 'SET_USER') {
        return {
            ...state,
            users : actions.user
        }
    }

    return state

}

export default chatReducer