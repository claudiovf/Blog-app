import React, {useState} from 'react'
import { handleLogin } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const LoginForm = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	
	return (
		<form onSubmit={(event) => {
			event.preventDefault()
			props.handleLogin(username, password)
			
			}} className="loginForm">
			<h3>Login to start</h3>
			<div>
				Username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={event => setUsername(event.target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={event => setPassword(event.target.value)}
				/>
			</div>
			<Button variant="dark" name="loginSubmit" type="submit">login</Button>
		</form>
	)
}



const ConnectedLoginForm = connect(null, {handleLogin})(LoginForm)
export default ConnectedLoginForm