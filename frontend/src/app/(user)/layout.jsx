'use client';
import React from 'react'
import UserAuthoriser from '../UserAuthoriser'
import { GraphProvider } from '@/context/GraphContext';

const Layout = ({ children }) => {
    return (
        <UserAuthoriser>
            <GraphProvider>
                {children}
            </GraphProvider>
        </UserAuthoriser>
    )
}

export default Layout