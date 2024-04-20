'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import backgroundImage from '../../public/blackbg.png';
import './HomePage.css';
import ScrollReveal from 'scrollreveal';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';

const Home = () => {
  const Router = useRouter();
  return (
    <div className="vh-100">
      <div style={{
        backgroundImage: `url("https://nordicapis.com/wp-content/uploads/Walkthrough-of-Using-GraphQL-Shield-1024x576.png")`,
        backgroundSize: "cover"
      }}>
        <div className='row px-5 pt-4'>
          <p className="fs-2 pt-5 text-white" id='intro'>
            If you've seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:
          </p>
        </div>
        <div className="row px-5 pb-5">
          <div className='table-responsive d-flex justify-content-center'>
            <table className='table table-bordered table-dark table-hover table-sm w-50' id='table1'>
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
        <div className="d-flex justify-content-center pb-5">
          <button onClick={() => Router.push('login')} type="button" className="btn btn-outline-light p-2 m-2 w-25 text-white">Login</button>
          <button onClick={() => Router.push('signup')} type="button" className="btn btn-outline-light p-2 m-2 w-25 text-white">Signup</button>
        </div>
      </div>
      <div className='d-flex justify-content-center p-5'>
        <h4 className="text-center px-5 py-4 w-50">GraphQL is a query language for your API, and a runtime for executing those queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.</h4>
      </div>
      <div className='d-flex justify-content-center'>
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
          <button onClick={() => Router.push('/login')} type="button" className="btn btn-outline-light text-white p-2 m-2 w-25">Get Started</button>
        </div>
      </div>
      <div style={{
        backgroundImage: `url("https://wallpaperswide.com/download/light_background-wallpaper-1920x1080.jpg")`,
        backgroundSize: "cover"
      }}>
        <div className='d-flex justify-content-center'>
          <h1 className='text-center px-5 py-4 text-black'>How GraphQL is different from REST ?</h1>
        </div>
        <div className='table-responsive d-flex justify-content-center'>
          <table className='table table-bordered table-hover w-75 border-dark'>
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
      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#45637d' }}>
      <MDBContainer className='p-4'>
        <section className=''>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol lg='6'>
              <div className='ratio ratio-16x9'>
                <iframe
                  className='shadow-1-strong rounded'
                  src='https://www.youtube.com/embed/eIQh02xuVw4?si=wbpbAqHs_sxSHSVx'
                  title='YouTube video'
                  allowFullScreen
                  data-gtm-yt-inspected-2340190_699='true'
                  id='388567449'
                ></iframe>
              </div>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    </MDBFooter>
      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                GraphQL Forge
              </h6>
              <p>
              Representing the transformative power of GraphQL technology and the tools available to developers to harness that power effectively.
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='https://graphql.org/' className='text-reset'>
                  Intro to GraphQL
                </a>
              </p>
              <p>
                <a href='https://www.apollographql.com/' className='text-reset'>
                  Apollo Server
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Lucknow, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                aviralchandra18@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 7080877821
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          GraphQL_Forge
        </a>
      </div>
    </div >
    
      )
}

      export default Home