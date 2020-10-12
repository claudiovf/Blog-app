import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'


const Likes = ({ blog, updateBlog }) => {
	const [blogLikes, setBlogLikes] = useState(blog.likes)
	const dispatch = useDispatch()

	const addLike = event => {
		event.preventDefault()

		dispatch(updateBlog(blog.id, {
			likes: blogLikes + 1,
		}))

		setBlogLikes(blogLikes + 1)

	}


	return (
		<div>
            Likes: {blogLikes}
			<Button variant="danger" name="likeButton" onClick={event => addLike(event)}>like</Button>
		</div>
	)
}

export default Likes