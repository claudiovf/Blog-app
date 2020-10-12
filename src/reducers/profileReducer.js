import usersService from '../services/users'

const profileReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_PROF':
            return action.data
        default: 
            return state
    }
}

export const setProfile = (id) => {

    return async dispatch => {
        const profile = await usersService.getProfile(id)
        

        dispatch({
            type: 'SET_PROF',
            data: profile
        })
    }
}

export default profileReducer