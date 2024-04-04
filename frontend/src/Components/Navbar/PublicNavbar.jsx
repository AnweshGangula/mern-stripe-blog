import React from 'react'
import { Link } from 'react-router-dom'

const PublicNavbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/create-post'>
                        Create Posts
                    </Link>
                </li>
                <li>
                    <Link to='/lists'>
                        Display all posts
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default PublicNavbar