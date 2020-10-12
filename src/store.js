import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from  'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import profileReducer from './reducers/profileReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    user: loginReducer,
    users: usersReducer,
    profile: profileReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store