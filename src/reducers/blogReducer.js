import blogService from '../services/blogs'

const blogReducer = (state = [], action ) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'RM_BLOG': {
            const id = action.data

            return state.filter(blog => blog.id !== id)
        }
        case 'UP_BLOG': {
            
            return action.data
        }
        case 'ADD_BLOG': {
            return state.concat(action.data)
        }
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data: blogs,
        })
    }
}

export 	const removeBlog = (id, blog) => {
    return async dispatch => {

        let confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

        if( confirmed ) {

            const res = await blogService.deleteBlog(id)
            
            
            if (!res) {
            

                dispatch({
                    type: 'RM_BLOG',
                    data: id
                })
                
            }
        }

    }
}

export const updateBlog = (id, updatedBlog) => {
    return async dispatch => {
        const updated = await blogService.update(id, updatedBlog)

        if(updated) {
            const newAll = await blogService.getAll()

            dispatch({
                type: 'UP_BLOG',
                data: newAll
            })
        }
    }
}

export 	const addNewBlog = (newBlog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(newBlog)

        if (addedBlog) {
            dispatch({
                type: 'ADD_BLOG',
                data: newBlog
            })
        }
    }
}

export default blogReducer