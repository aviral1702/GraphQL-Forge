import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import useAppContext from './AppContext';

const Navbar = () => {

    const [openNavColorThird, setOpenNavColorThird] = useState(false);

    const { loggedIn, logout } = useAppContext();

    const showLoginOptions = () => {
        if (loggedIn) {
            return <MDBBtn onClick={logout} color='danger'>Logout</MDBBtn>
        } else {
            return <MDBNavbarLink href='/login' >
                <button className='btn btn-info text-dark'>Login</button></MDBNavbarLink>
        }
    }

    return (
        <MDBNavbar expand='lg' light className='bg-dark'>
            <MDBContainer>
                <MDBNavbarBrand href='#' className='text-white'>
                    <img
                        src='GraphQL logo.png'
                        height='50'
                        alt=''
                        loading='lazy'
                    />GraphQL Forge</MDBNavbarBrand>
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
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/' className='text-white'>
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
                            {showLoginOptions()}
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Navbar