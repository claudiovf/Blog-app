import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Blogs from './Blogs'


describe('<Blogs /> ', () => {
	let component
	const blogs = [{
		title: 'Testing Blog Script',
		author: 'Jest',
		url: 'www.bbc.com',
		likes: 30,
		id: 123456
	}]


	const tree = renderer
		.create(<Blogs blogs={blogs} />)
		.toJSON()

	expect(tree).toMatchSnapshot()

	beforeEach(() => {
		component = render(
			<Blogs blogs={blogs} />
		)

	})


	test('displays only Blog Title <Togglable />  by default', () => {
		const blog = component.container.querySelector('.togglableContent')

		expect(blog.textContent).toContain('Testing Blog Script')
		expect(blog.textContent).not.toContain('author')
		expect(blog.textContent).not.toContain('url')
		expect(blog.textContent).not.toContain('likes')

	})

	test('displays Title and Author, but not Likes and URL', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const blog = component.container.querySelector('.visibleTogglable')

		expect(blog.textContent).toContain('Testing Blog Script')
		expect(blog.textContent).toContain('Author')
		expect(blog.textContent).toContain('URL')
		expect(blog.textContent).toContain('Likes')

	})

})