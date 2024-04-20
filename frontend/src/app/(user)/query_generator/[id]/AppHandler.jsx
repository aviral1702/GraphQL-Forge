import React from 'react'
import useGraphContext from '@/context/GraphContext';
import { CopyBlock, dracula } from 'react-code-blocks';

const AppHandler = () => {

    const { mongoDbUrl, setMongoDbUrl } = useGraphContext();

    const generateAppCode = () => {
        return `const express  = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const schema = require('./graphQLSchema');
const url = "${mongoDbUrl}";
mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log("Server is running"));
mongoose.exports = mongoose;`
    }

    return (
        <div className='row p-4'>
            {/* For MongoDB URL */}
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h4>Query</h4>
                    </div>
                    <div className="card-body">
                        <p>To get started, provide the MongoDB URL for the database you want to connect to.</p>
                        <label htmlFor="MongoDB URL">MongoDB URL :&nbsp;</label>
                        <input type="text" className='form-control' id="MongoDB URL" value={mongoDbUrl} onChange={(e) => {
                            setMongoDbUrl(e.target.value);
                        }}
                        />
                    </div>
                </div>
            </div>
            {/* For App.js code */}
            <div className="col-md-7">
                <div className="card">
                    {/* <div className="card-header d-flex justify-content-between">
                        <h4>App.js Code</h4>
                        <button onClick={handleCopyClickAppCode} className='btn btn-primary btn-outline-primary btn-rounded'>
                            <i className="fa-regular fa-copy"></i>  Copy
                        </button>
                    </div> */}
                    <div className="card-body">
                        <CopyBlock
                            theme={dracula}
                            text={generateAppCode()}
                            language={'JavaScript'}
                            showLineNumbers={true}
                            wrapLines
                        />
                        {/* <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateAppCode()} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHandler;