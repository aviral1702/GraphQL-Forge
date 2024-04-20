'use client';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Editor from '@monaco-editor/react';
import * as css from './client.css';

const DEFAULT_VARIABLE = `{
    name: 'Aviral',
    age: 78
}`

const FETCH_SINGLE_QUERY = () => `query SingleProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
        id
        price
        productName
        colors
    }
  }
`

const FETCH_ALL_QUERY = () => `query AllProducts {
    getProductsList {
        id
        price
        productName
        colors
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

    const generateAddMutation = () => {
        setQuery(ADD_MUTATION());
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
        <div className='bg-dark pt-5'>
            <div className='text-center'>
                <h1 className='text-white pt-5'>GraphQL Client</h1>
            </div>
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

                            {/* <ul className='list-group'>
                                <li className='list-group-item'>
                                    <div className='d-flex justify-content-between'>
                                        <p>Add Mutation</p>
                                        <button className='btn btn-primary' onClick={generateAddMutation}>Generate Mutation</button>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='d-flex justify-content-between'>
                                        <p>Update Mutation</p>
                                        <button className='btn btn-primary' onClick={generateUpdateMutation}>Generate Mutation</button>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='d-flex justify-content-between'>
                                        <p>Delete Mutation</p>
                                        <button className='btn btn-primary' onClick={generateDeleteMutation}>Generate Mutation</button>
                                    </div>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="query">Operation</label>
                            <Editor theme='vs-dark' id="query" height="40vh" defaultLanguage="javascript" value={query} onChange={setQuery} />
                            <label htmlFor="variables">Variables</label>
                            <Editor theme='vs-dark' id="variables" height="30vh" defaultLanguage="javascript" value={variables} onChange={setVariables} />
                        </div>
                        <div className="text-center">
                            <button onClick={makeQuery} className="btn btn-primary mt-3 mb-5  ">Make Query</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group text-white">
                            <label htmlFor="response">Response</label>
                            <Editor theme='vs-dark' id="response" height="73vh" defaultLanguage="javascript" value={response} onChange={setResponse} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphQLClient;