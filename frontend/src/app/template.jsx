'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppProvider, useAppContext } from './AppContext';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const Template = ({ children }) => {
  // useEffect(() => {
  //     require('bootstrap/dist/js/bootstrap.bundle.min');
  // }   , []);



  // const { loggedIn, setLoggedIn } = useAppContext();

  // const sessionData = JSON.parse(sessionStorage.getItem('user'));
  // const [currentUser, setCurrentUser] = useState(sessionData);

  // const logout = () => {  
  //   sessionStorage.removeItem('user');
  //   setCurrentUser(null);
  //   setLoggedIn(false);
  //   Navigate('/login');
  // }

  return (
    <div>
      <AppProvider>
        {/* <h1>Template</h1> */}
        <Navbar />
        {children}
      </AppProvider>
    </div>
  )
}

export default Template