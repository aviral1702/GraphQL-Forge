'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useAppContext } from './AppContext';
import { Navigate } from 'react-router-dom';

const Template = ({ children }) => {
  // useEffect(() => {
  //     require('bootstrap/dist/js/bootstrap.bundle.min');
  // }   , []);

  const [openNavColorThird, setOpenNavColorThird] = useState(false);

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
      {/* <h1>Template</h1> */}
      <MDBNavbar expand='lg' light className='bg-dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#' className='text-white'>Navbar</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColorThird(!openNavColorThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorThird} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/' className='text-white'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='https://graphql.org/' className='text-white' target='_blank'>What is GraphQL</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className='text-white'>Support</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/login' >
                  <button className='btn btn-info text-dark'>Login</button></MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {children}
    </div>
  )
}

export default Template