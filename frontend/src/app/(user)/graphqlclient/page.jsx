'use client';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Editor from '@monaco-editor/react';
import * as css from './client.css';

const DEFAULT_VARIABLE = `{
    name: 'Aviral',
    age: 78
}`

const FETCH_SINGLE_QUERY = () => `query GetEntity($getProductId: ID!) {
    getEntity(id: $getEntityId) {
        fieldname1
        fieldname2
    }
  }
`

const FETCH_ALL_QUERY = () => `query GetEntity {
    getEntity {
        fieldname1
        fieldname2
    }
    }
`

const UPDATE_MUTATION = () => `mutation updateEntity($name: String, $age: Int) {
    updateEntity(name: $name, age: $age) {
        name
        age
    }
}`

const ADD_MUTATION = () => `mutation addEntity($name: String, $age: Int) {
    addEntity(name: $name, age: $age) {
        name
        age
    }
}`

const DELETE_MUTATION = () => `mutation deleteEntity($name: String, $age: Int) {
    deleteEntity(name: $name, age: $age) {
        name
        age
    }
}`


const GraphQLClient = () => {

    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [variables, setVariables] = useState(DEFAULT_VARIABLE);

    const updateVariable = (key, value) => {
        const newVariables = [...variables];
        const index = newVariables.findIndex(v => v.name === key);
        if (index !== -1) {
            newVariables[index].value = value;
            setVariables(newVariables);
        }
    }

    const generateFetchAllQuery = () => {
        setQuery(FETCH_ALL_QUERY());
    }

    const generateFetchSingleQuery = () => {
        setQuery(FETCH_SINGLE_QUERY());
    }

    const generateUpdateMutation = () => {
        setQuery(UPDATE_MUTATION());
    }

    const generateNewMutation = () => {
        setQuery(NEW_MUTATION());
    }

    const generateDeleteMutation = () => {
        setQuery(DELETE_MUTATION());
    }

    const makeQuery = async () => {
        // const query = document.getElementById('query').value;
        // console.log(query);
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
        setResponse(JSON.stringify(res, null, 2));
    }

    return (
        <div className='vh-100 bg-dark pt-5'>
            <div className='text-center'>
                {/* <input className='bg-dark border border-3 rounded-5 text-white m-2' id="url" type="text" defaultValue={'  http://localhost:3000'} /> */}

                <h1 className='text-white fst-italic pt-5'>GraphQL Client</h1>
                {/* <button className='m-3' id="logoutButton" type='submit'>Logout</button> */}
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
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="document">Documentation</label>
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <div className='d-flex justify-content-between'>
                                        <p>Fetch Single Entity Query</p>
                                        <button className='btn btn-primary' onClick={generateFetchSingleQuery}>Generate Query</button>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='d-flex justify-content-between'>
                                        <p>Fetch All Entity Query</p>
                                        <button className='btn btn-primary' onClick={generateFetchAllQuery}>Generate Query</button>
                                    </div>
                                </li>
                            </ul>
                            {/* <textarea className="form-control" id="document" rows="15"></textarea> */}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="query">Operation</label>
                            {/* <textarea className="form-control" id="query" rows="10" onChange={
                                (e) => setQuery(e.target.value)
                            } value={query}></textarea> */}
                            <Editor theme='vs-dark' id="query" height="40vh" defaultLanguage="javascript" value={query} onChange={setQuery} />
                            <label htmlFor="variables">Variables</label>
                            {/* <textarea className="form-control" rows="5" onChange={(e) => setVariables(e.target.value)} value={variables}></textarea> */}
                            <Editor theme='vs-dark' id="variables" height="30vh" defaultLanguage="javascript" value={variables} onChange={setVariables} />
                        </div>
                        <div className="text-center">
                            <button onClick={makeQuery} className="btn btn-primary mt-3 mb-5  ">Make Query</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="response">Response</label>
                            {/* <textarea onChange={e => setResponse(e.target.value)} value={response} className="form-control" id="response" rows="15"></textarea> */}
                            <Editor theme='vs-dark' id="response" height="73vh" defaultLanguage="javascript" value={response} onChange={setResponse} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphQLClient;