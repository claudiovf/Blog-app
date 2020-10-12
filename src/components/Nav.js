import React from 'react'
import { connect } from 'react-redux'
import LoggedIn from '../components/LoggedIn'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Nav = () => {
    return (
        <div>
            <Link to="/"><Button>Blogs</Button></Link>
            <Link to="/users"><Button variant="primary" type="submit">Users</Button></Link>
            

            <LoggedIn />
        </div>
    )
}

const ConnectedNav = connect()(Nav)
export default ConnectedNav