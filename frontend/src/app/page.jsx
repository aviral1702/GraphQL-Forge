'use client';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import backgroundImage from '../../public/blackbg.png';
import './HomePage.css';
import { ScrollReveal } from 'scrollreveal';
import useAppContext from './AppContext';

const Home = () => {
  const Router = useRouter();

  const { loggedIn, logout } = useAppContext();

    const showLoginOptions = () => {
        if (loggedIn) {
            return <div className='d-flex justify-content-center pb-5 gap-5'>
              <a onClick={logout}>
                <button className='btn btn-outline-light px-5 m-2 w-100 text-white btn-lg'>Logout</button>
            </a>
            </div>
        } else {
            return <div className='d-flex justify-content-center pb-5 gap-5'>
              <a href='/login' >
            <button className='btn btn-outline-light px-5 m-2 w-100 text-white btn-lg'>Login</button></a>
            <a href='/signup' >
            <button className='btn btn-outline-light px-5 m-2 w-100 text-white btn-lg'>Signup</button></a>
            </div> 
        }
    }

    const getStarted = () => {
      if (loggedIn) {
        Router.push('/manageprojects');
        return;
      } else {
        Router.push('/login');
      }
  }
  return (
    <div style={{
      backgroundImage: `url("https://nordicapis.com/wp-content/uploads/Walkthrough-of-Using-GraphQL-Shield-1024x576.png")`,
      backgroundSize: "cover"
    }}>
      {/* <video muted autoPlay loop id='bg-video'>
        <source src="BgVideo.mp4" type="video/mp4" /></video> */}
      <div className='container'>
        <div className='row px-5'>
          <p className="fs-2 pt-5 text-white" id='intro'>
            If you've seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:
          </p>
        </div>
        <div className="row px-5 pb-5">
          <div className='table-responsive d-flex justify-content-center'>
            <table className='table table-bordered table-dark table-hover table-sm w-100' id='table1'>
              <thead>
                <tr>
                  <th className='fs-5 text-center'>Query</th>
                  <th className='fs-5 text-center'>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <pre className='fs-6'>
                      {`
{
  hero {
    name
    appearsIn
  }
}                  
                `}
                    </pre>
                  </td>
                  <td>
                    <pre className='fs-6'>
                      {`
{
    "data": {
      "hero": {
        "name": "R2-D2",
        "appearsIn": [
          "NEWHOPE",
          "EMPIRE",
          "JEDI"
        ]
      }
    }
  }
  `}
                    </pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{
        backgroundImage: `url("https://w0.peakpx.com/wallpaper/410/412/HD-wallpaper-plain-black-black.jpg")`,
        backgroundSize: "contain"
      }}>
        <div className="row px-5 p-5">
          <div className='col-md-3'>
            <video className="w-100 h-100" muted autoPlay loop>
              <source src="/GraphQL.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="col-md-3 text-white">
            <h4>Describe your data</h4>
            <p>Describe your data in the schema definition language (SDL)</p>
            <div className='table-responsive'>
              <table className='table table-borderless table-sm' id='table2'  >
                <tr>
                  <td>
                    <pre className='text-white'>
                      {`
type Project {
  name: String
  tagline: String
  contributors: [User]
}
`}
                    </pre>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="col-md-3 text-white">
            <h4>Ask for what you want</h4>
            <p>Specify the operations you want to perform on your data.</p>
            <div className='table-responsive'>
              <table className='table table-borderless table-sm' id='table2'  >
                <tr>
                  <td>
                    <pre className='text-white'>
                      {`
{
  project(name: "GraphQL") {
    tagline
  }
}
`}
                    </pre>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="col-md-3 text-white">
            <h4>Get desired response</h4>
            <p>Get the exact data you asked for, nothing more, nothing less.</p>
            <div className='table-responsive'>
              <table className='table table-borderless table-sm' id='table2'  >
                <tr>
                  <td>
                    <pre className='text-white'>{`
{
  "project": {
    "tagline": "A query language"
  }
}
`}
                    </pre>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div>
          {showLoginOptions()}
          {/* <button onClick={() => Router.push('login')} type="button" className="btn btn-outline-light p-2 m-2 w-25 text-white">Login</button>
          <button onClick={() => Router.push('signup')} type="button" className="btn btn-outline-light p-2 m-2 w-25 text-white">Signup</button> */}
        </div>
      </div>
      <div className='d-flex justify-content-center p-5 text-black'>
        <h4 className="text-center px-5 py-4 w-50">GraphQL is a query language for your API, and a runtime for executing those queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.</h4>
      </div>
      <div className='d-flex justify-content-center text-black'>
        <h4 className="text-center px-5 pb-5 w-50">A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type.</h4>
      </div>
      <div style={{
        backgroundImage: `url("https://w0.peakpx.com/wallpaper/410/412/HD-wallpaper-plain-black-black.jpg")`,
        backgroundSize: "contain"
      }}>
        <div className='d-flex justify-content-center'>
          <h2 className='text-center px-5 py-5' id='code_generate'>Want auto generated Queries or the backend code for your application ?</h2>
          <h3 className='text-center px-5 py-5' id='code_generate'>This tool helps you to build queries by leveraging your API's type system.</h3>
        </div>
        <div className='d-flex justify-content-center text-white'>
          <h3 className='text-center' id='code_generate'>Click on the below button to get the code.</h3>
        </div>
        <div className="d-flex justify-content-center p-5">
          <button onClick={getStarted} type="button" className="btn btn-outline-light text-white p-2 m-2 w-25">Get Started</button>
        </div>
      </div>
      <div className='d-flex justify-content-center text-black'>
        <h1 className='text-center px-5 py-4'>How GraphQL is different from REST ?</h1>
      </div>
      <div className='table-responsive d-flex justify-content-center'>
        <table className='table table-bordered table-hover w-75'>
          <thead className='text-center'>
            <tr>
              <th>Parameter</th>
              <th>GraphQL</th>
              <th>REST</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What is it?</td>
              <td>GraphQL is a query language, architecture style, and set of tools to create and manipulate APIs.</td>
              <td>REST is a set of rules that defines structured data exchange between a client and a server.</td>
            </tr>
            <tr>
              <td>Data access</td>
              <td>GraphQL has a single URL endpoint.</td>
              <td>REST has multiple endpoints in the form of URLs to define resources.</td>
            </tr>
            <tr>
              <td>Data returned</td>
              <td>GraphQL returns data in a flexible structure defined by the client.</td>
              <td>REST returns data in a fixed structure defined by the server.</td>
            </tr>
            <tr>
              <td>How data is structured and defined</td>
              <td>GraphQL data is strongly typed. So the client receives data in predetermined and mutually understood formats.</td>
              <td>REST data is weakly typed. So the client must decide how to interpret the formatted data when it is returned.</td>
            </tr>
            <tr>
              <td>Error checking</td>
              <td>With GraphQL, invalid requests are typically rejected by schema structure. This results in an autogenerated error message.</td>
              <td>With REST, the client must check if the returned data is valid.</td>
            </tr>
            <tr>
              <td> </td>
              <td><img src="GraphQLDiagram.png" alt="" width={400} height={400} /></td>
              <td><img src="RestDiagram.png" alt="" width={400} height={400} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Home