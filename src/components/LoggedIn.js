import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import {Button} from 'react-bootstrap'
//handleLogout
const LoggedIn = (props) => {

	return (
		<p>
            Logged in as {props.user.name}
			<Button
			 	variant="dark"
				type="submit"
				name="logout"
				onClick={props.logout}
			>logout</Button>
		</p>
	)
}
const mapStateToProps = state => {
	if(state.user === null) return null
	return { 
		user: state.user
	}
}

const ConnectedLoggedIn = connect(mapStateToProps, {logout})(LoggedIn)
export default ConnectedLoggedIn