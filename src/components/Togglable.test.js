import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Togglable from './Togglable'

describe('<Togglable /> ', () => {
	let component

	const tree = renderer
		.create(<Togglable buttonLabel='view'>
			<div className="testDiv"></div>
		</Togglable>)
		.toJSON()

	expect(tree).toMatchSnapshot()

	beforeEach(() => {
		component = render(
			<Togglable buttonLabel='view'>
				<div className='testDiv' />
			</Togglable>
		)
	})

	test('renders its children', () => {
		expect(component.container.querySelector('.testDiv')
		).toBeDefined()
	})
	test('when blog is visible', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const div = component.container.querySelector('.testDiv')

		expect(div).not.toHaveStyle('display: none')

	})
})