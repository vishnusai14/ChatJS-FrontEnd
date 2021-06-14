
export const setToken = (token) => {

    return {
        type : 'SET_TOKEN',
        token : token
    }

}

export const setUser = (user) => {
 
    console.log("This is From Setter" , user)
    return {
        type : 'SET_USER',
        user : user
    }

    
}