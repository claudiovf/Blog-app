import React from 'react'
import { connect } from 'react-redux'

const UserProfile = (props) => {
    if(props.profile){
        return(
            <div>
                <h2>{props.profile.name}</h2>
                <h4>Blogs Added</h4>
    
                {props.profile.blogs.map(blog => {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </div>
        )
    }

    return null
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

const ConnectedUserProfile = connect(mapStateToProps)(UserProfile)
export default ConnectedUserProfile