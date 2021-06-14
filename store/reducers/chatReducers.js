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
        console.log("This is From Set User Reducer", actions.user.rows._array)
        return {
            ...state,
            users : actions.user.rows._array
        }
    }

    return state

}

export default chatReducer