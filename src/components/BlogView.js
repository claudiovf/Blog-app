import React, {useState} from 'react'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import Likes from '../components/Likes'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BlogView = ({blog}) => {
    const [comment, setComment ] = useState('')

    const dispatch = useDispatch()

    if (!blog) return <Redirect to="/" />
    console.log(blog)


    return(
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <Likes blog={blog} updateBlog={updateBlog} />
            <p>{blog.url}</p>
            <Button variant="dark" name="deleteBlog" onClick={() => {
                dispatch(removeBlog(blog.id, blog))
            }}>Delete</Button>
            
            <h3>Comments</h3>
            {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
        
            <form onSubmit={(event) => {
                event.preventDefault()

                dispatch(updateBlog(blog.id, {
                comments: blog.comments.concat(comment)
                }))

                setComment('')
            }}>
                <input 
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button variant="dark" type="submit">Post Comment</Button>
            </form>
        </div>
    )
}
export default BlogView