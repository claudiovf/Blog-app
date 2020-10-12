import loginService from '../services/login'
import blogService from '../services/blogs'


const loginReducer = ( state = null, action ) => {
    switch(action.type) {
        case 'LOGGED_IN':
            return action.data
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export const handleLogin = (username, password) => {

    return async dispatch => {
        const user = await loginService.login({
            username, password
        })

        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)
        
        dispatch({
            type: 'LOGGED_IN',
            data: user
        })
    }
}

export const userReturns = (user) => {
    return async dispatch => {
        
        blogService.setToken(user.token)
        
        dispatch({
            type: 'LOGGED_IN',
            data: user
        })		
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedUser')

        dispatch({
            type: 'LOG_OUT',
        })
    }
}

export default loginReducer