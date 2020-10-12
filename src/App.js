import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'
import Nav from './components/Nav'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import BlogView from './components/BlogView'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { userReturns } from './reducers/loginReducer'
import { connect } from 'react-redux'

import {
	Switch,
	Route,
	useRouteMatch,
} from 'react-router-dom'

const Hone = styled.div`
background: teal;
padding: 1em;
color: white;
margin-bottom: 10px;
border-radius: 8px;
`

const App = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])


	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(userReturns(user))
		}
	}, [dispatch])

	const blogFormRef = useRef()

	
	const match = useRouteMatch('/blogs/:id')
	
	const blog = match
		? props.blogs.find(blog => blog.id === match.params.id)
		: null


	return (
		<Container>
			<Hone>Blog App</Hone>

			{props.user === null
				//  <Togglable buttonLabel='Login to start' cancelLabel='Cancel'>
				?	<LoginForm />
				// </Togglable>

				: <>
					<Nav />
					<Togglable
						buttonLabel='Add new blog'
						cancelLabel='Cancel'
						ref={blogFormRef}>
						<CreateNewBlog />
					</Togglable>

					<Switch>
						<Route path="/users/:id">
							<UserProfile />
						</Route>
						<Route path="/blogs/:id">
							<BlogView blog={blog}/>
						</Route>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/">
							<Blogs />
						</Route>
					</Switch>

				</>
			}

		</Container>
	)
}

const mapStateToProps = state => {
	return {
		user: state.user,
		blogs: state.blogs,
		profile: state.profile,
	}
}

const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp
