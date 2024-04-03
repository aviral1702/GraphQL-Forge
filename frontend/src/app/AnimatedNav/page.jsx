"use client";
import React, {use, useState} from 'react'
import * as css from './navbar.css';
import useAppContext from '../AppContext';

const page = () => {

    const [openNavColorThird, setOpenNavColorThird] = useState(false);

    const { loggedIn, logout } = useAppContext();

    const showLoginOptions = () => {
        if (loggedIn) {
            return <a onClick={logout}>
                <button className='btn btn-danger'>Logout</button>
            </a>
        } else {
            return <a href='/login' >
                <button className='btn btn-info text-dark'>Login</button></a>
        }
    }

  return (
    <div>
        <>
  {/*Main Navigation*/}
  <header>
    {/* Animated navbar*/}
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-scroll"
      data-mdb-navbar-init=""
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler ps-0"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="d-flex justify-content-start align-items-center">
            <i className="fas fa-bars" />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarExample01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
            <a href='#' className='text-white'>
                    <img
                        src='GraphQL logo.png'
                        height='50'
                        alt=''
                        loading='lazy'
                    /></a>
                    </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#intro">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                rel="nofollow"
                target="_blank"
              >
                What is GraphQL
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://mdbootstrap.com/docs/standard/"
                target="_blank"
              >
                Support
              </a>
            </li>
            <li className="nav-item">
                {showLoginOptions()}
            </li>
          </ul>
          <ul className="navbar-nav flex-row">
            {/* Icons */}
            <li className="nav-item">
              <a
                className="nav-link pe-2"
                href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                rel="nofollow"
                target="_blank"
              >
                <i className="fab fa-youtube" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link px-2"
                href="https://www.facebook.com/mdbootstrap"
                rel="nofollow"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link px-2"
                href="https://twitter.com/MDBootstrap"
                rel="nofollow"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link ps-2"
                href="https://github.com/mdbootstrap/mdb-ui-kit"
                rel="nofollow"
                target="_blank"
              >
                <i className="fab fa-github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* Animated navbar */}
    {/* Background image */}
    <div
      id="intro"
      className="bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/new/fluid/city/113.jpg)",
        height: "100vh"
      }}
    >
      <div
        className="mask text-white"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="container d-flex align-items-center text-center h-100">
          <div>
            <h1 className="mb-5">This is title</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              molestiae laboriosam numquam expedita ullam saepe ipsam, deserunt
              provident corporis, sit non accusamus maxime, magni nulla quasi
              iste ipsa architecto? Autem!
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Background image */}
  </header>
  {/*Main Navigation*/}
  <div className="container my-5">
    <p>
      {" "}
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis quam
      minima perspiciatis eos tenetur. Praesentium dolores at quos aperiam sed,
      sint provident consectetur incidunt, nostrum porro earum commodi, ex
      architecto.
    </p>
  </div>
</>

    </div>
  )
}

export default page