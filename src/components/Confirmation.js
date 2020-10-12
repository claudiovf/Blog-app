import React from 'react'

const Confirmation = ({ message }) => {
	if(message === null) return null

	return (
		<div className='confirmed'>
			{message}
		</div>
	)
}


export default Confirmation