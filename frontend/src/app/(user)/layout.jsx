import React from 'react'
import UserAuthoriser from '../UserAuthoriser'

const Layout = ({ children }) => {
    return (
        <UserAuthoriser>{children}</UserAuthoriser>
    )
}

export default Layout