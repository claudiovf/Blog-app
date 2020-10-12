import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	const expandContainer = props.buttonLabel !== 'view'
		?   <div style={showWhenVisible} className="visibleTogglable">
			{props.children}
			{props.title || ''} <button onClick={toggleVisibility}> {props.cancelLabel} </button>
		</div>
		:   <div style={showWhenVisible} className="visibleTogglable">
			{props.title || ''} <button onClick={toggleVisibility}> {props.cancelLabel} </button>
			{props.children}
		</div>

	return (
		<div>
			<div style={hideWhenVisible} className="togglableContent">
				{props.title} <Button variant="dark" name={props.buttonLabel} onClick={toggleVisibility}> {props.buttonLabel} </Button>
			</div>
			{expandContainer}

		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable