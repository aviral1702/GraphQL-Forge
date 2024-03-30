'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

const UserAuthoriser = ({children}) => {

    const hasRun = useRef(false);
    const [currentUser, setCurrentUser] = useState();

    const router = useRouter();

    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            setCurrentUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [])
    
    if(currentUser === null){
        toast.error('You are not logged in');
        router.push('/login');
        return;
    }else{
        return children;
    }


  return (
    <div>UserAuthoriser</div>
  )
}

export default UserAuthoriser;