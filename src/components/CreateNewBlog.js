import React, { useState } from 'react'
import { addNewBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const CreateNewBlog = (props) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleTitleChange = event => {
		setNewTitle(event.target.value)
	}
	const handleAuthorChange = event => {
		setNewAuthor(event.target.value)
	}
	const handleUrlChange = event => {
		setNewUrl(event.target.value)
	}

	const addNew = event => {
		event.preventDefault()

		props.addNewBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			likes: 0
		})

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')

	}


	return (
		<form onSubmit={addNew} className="blogForm">
			<h2>Create New Blog</h2>
			<div>
            Title:
				<input
					type="text"
					value={newTitle}
					name="New Title"
					onChange={input => handleTitleChange(input)}
				/>
			</div>
			<div>
            Author:
				<input
					type="text"
					value={newAuthor}
					name="New Author"
					onChange={input => handleAuthorChange(input)}
				/>
			</div>
			<div>
            Url:
				<input
					type="text"
					value={newUrl}
					name="New Url"
					onChange={input => handleUrlChange(input)}
				/>
			</div>
			<Button variant="dark" name="Blog Submit" type="submit">Create</Button>
		</form>
	)
}

const ConnectedCreateNewBlog = connect(
	null,
	{addNewBlog}
)(CreateNewBlog)
export default ConnectedCreateNewBlog