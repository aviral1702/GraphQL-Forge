'use client';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Editor from '@monaco-editor/react';
import * as css from './client.css';
const GraphQLClient = () => {

    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [variables, setVariables] = useState("");

    const makeQuery = async () => {
        const query = document.getElementById('query').value;
        const response = await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        const res = await response.json();
        document.getElementById('response').value = JSON.stringify(res, null, 2);
    }

    return (
        <div className='bg-dark'>
            <div className='d-flex justify-content-between'>
                <input className='bg-dark border border-3 rounded-5 text-white m-2' id="url" type="text" defaultValue={'  http://localhost:3000'} />

                <h1 className='text-white fst-italic mt-1'>GraphQL Client</h1>
                <button className='m-3' id="logoutButton" type='submit'>Logout</button>
            </div>
            {/* <Nav className='bg-primary-subtle' justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav> */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="document">Documentation</label>
                            <textarea className="form-control" id="document" rows="15"></textarea>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="query">Operation</label>
                            <textarea className="form-control" id="query" rows="10" onChange={
                                (e) => setQuery(e.target.value)
                            } value={query}></textarea>
                            {/* <Editor theme='vs-dark' id="query" height="40vh" defaultLanguage="javascript" value={query} onChange={(e) => setQuery(e.target.value)} /> */}
                            <label htmlFor="variables">Variables</label>
                            <textarea className="form-control" id="variables" rows="5" onChange={(e) => setVariables(e.target.value)}
                                value={variables}></textarea>
                            {/* <Editor theme='vs-dark' id="variables" height="30vh" defaultLanguage="javascript" value={variables} onChange={(e) => setVariables(e.target.value)} /> */}
                        </div>
                        <div className="text-center">
                            <button onClick={makeQuery} className="btn btn-primary mt-3 mb-5  ">Make Query</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="response">Response</label>
                            <textarea onChange={e => setResponse(e.target.value)} value={response} className="form-control" id="response" rows="15"></textarea>
                            {/* <Editor theme='vs-dark' id="response" height="73vh" defaultLanguage="javascript" value={response} onChange={(e) => setResponse(e.target.value)} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphQLClient;