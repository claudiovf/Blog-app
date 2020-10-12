import React from 'react'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'



const Blogs = (props) => {

	return (
		<div className="blogDiv">
			<h2>Blogs</h2>
			<Table>
				<tbody>
					{props.blogs.map((blog, i) =>
						<tr>
							<td>
								<Link key={i} to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</td>
							<td>
								{blog.likes} Likes
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

const mapStateToProps = state => {
	return { blogs: state.blogs}
}

const ConnectedBlogs = connect(
	mapStateToProps,
	{removeBlog, updateBlog}
)(Blogs)
export default ConnectedBlogs
