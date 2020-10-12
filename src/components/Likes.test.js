import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Likes from './Likes'

describe('<Likes /> ', () => {
	let component
	const updateBlog = jest.fn()

	const blog = {
		title: 'Testing Likes component',
		author: 'Jest',
		url: 'www.bbc.com',
		likes: 30
	}

	const tree = renderer
		.create(<Likes blog={blog} updateBlog={updateBlog} />)
		.toJSON()

	expect(tree).toMatchSnapshot()

	beforeEach(() => {

		component = render(
			<Likes blog={blog} updateBlog={updateBlog} />
		)
	})

	test('receives the right info from LIKE button', () => {

		const likeButton = component.getByText('like')

		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		component.debug()
		expect(updateBlog.mock.calls).toHaveLength(2)

	})

})