import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const req = await axios.get(baseUrl)

	return req.data
}

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token }
	}
	const res = await axios.post(baseUrl, newBlog, config)
	return res.data
}

const update = async (id, updatedBlog) => {

	const res = await axios.put(`${baseUrl}/${id}`, updatedBlog)
	return res.data
}

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token }
	}

	const res = await axios.delete(`${baseUrl}/${id}`, config)

	return res.data
}

export default { getAll, create, setToken, update, deleteBlog }