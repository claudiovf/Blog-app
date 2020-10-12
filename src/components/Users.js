import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { setProfile } from '../reducers/profileReducer'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {

    useEffect(() => {
		props.initUsers()
	}, [props])
    return(
        <div>
            <h2>Users</h2>
            <Table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs Created</th>
                    </tr>
                    {props.users.map(user => {
                        return(
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        <p onClick={() => props.setProfile(user.id)}>{user.name}</p>
                                    </Link>
                                </td>
                                <td>
                                    {user.blogs.length}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const ConnectedUsers = connect(mapStateToProps, {setProfile, initUsers})(Users)
export default ConnectedUsers