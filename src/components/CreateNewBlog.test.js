import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import CreateNewBlog from './CreateNewBlog'

describe('<CreateNewBlog /> ', () => {
	let component
	const createBlog = jest.fn()

	const tree = renderer
		.create(<CreateNewBlog createBlog={createBlog} />)
		.toJSON()

	expect(tree).toMatchSnapshot()

	beforeEach(() => {

		component = render(
			<CreateNewBlog createBlog={createBlog} />
		)
	})

	test('receives the right info from submit', () => {

		const form = component.container.querySelector('.blogForm')
		const title = component.container.querySelector('[name="New Title"]')
		const author = component.container.querySelector('[name="New Author"]')
		const url = component.container.querySelector('[name="New Url"]')


		fireEvent.change(title, {
			target: { value: 'Testing BlogForm with Jest' }
		})
		fireEvent.change(author, {
			target: { value: 'Jest' }
		})
		fireEvent.change(url, {
			target: { value: 'www.bbc.com' }
		})

		fireEvent.submit(form)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('Testing BlogForm with Jest')
		expect(createBlog.mock.calls[0][0].author).toContain('Jest')
		expect(createBlog.mock.calls[0][0].url).toContain('www.bbc.com')

	})

})