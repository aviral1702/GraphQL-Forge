'use client';
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import EntityHandler from '../EntityHandler';
import toast,{Toaster} from 'react-hot-toast';
import { useParams } from 'next/navigation';
// import videoBg from '../assets/Untitled_design.mp4';

const QueryGenerator = () => {
  const [text, setText] = useState("");
  const [mongoDBurl, setMongoDBurl] = useState('');
  const [schema_name, setschema_name] = useState('');
  const [model_name, setmodel_name] = useState('')
  const [projectData, setProjectData] = useState(null);

  const { id } = useParams();

  const getProjectData = async () => {
     fetch(`http://localhost:5000/project/getbyid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateProjectData = async () => {
    fetch(`http://localhost:5000/project/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.status);
    }).catch((err) => {
      console.log(err);
    });
  
  }

  useEffect(() => {
    getProjectData();
  }, []);
  

  const [selQueries, setSelQueries] = useState([{
    name: 'getProduct',
    parameters: [
      {
        name: 'id',
        type: 'ID',
        required: true
      }
    ],
    returnType: 'Product'
  }])

  //App.js Code
  const generateAppCode = () => {
    return `
    const express  = require('express');
    const cors = require('cors');
    const { ApolloServer } = require('apollo-server');
    const mongoose = require('mongoose');
    const schema = require('./graphQLSchema');
    const url = "${mongoDBurl}";
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
    mongoose.exports = mongoose;
    `
  }

  //Schema.js Code
  const generateMongoDBSchema = () => {
    return `
    const mongoose = require('mongoose');

    const ${schema_name} = new mongoose.Schema({
        category: String,
        productName: String,
        price: Number,
        colors: Object,
        imgPath: String,
    })
    
    module.exports = mongoose.model('${model_name}', ${schema_name});`
  }

  //Copy to Clipboard
  const handleCopyClickAppCode = async () => {
    try {
      await navigator.clipboard.writeText(generateAppCode());
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      toast.error("Copy to clipboard failed.");
    }
  };

  //Copy to Clipboard
  const handleCopyClickSchemaCode = async () => {
    try {
      await navigator.clipboard.writeText(generateMongoDBSchema());
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      toast.error("Copy to clipboard failed.");
    }
  };

  const updateProjectSchema = () => {
    let temp = projectData;
    temp.schemaList = selQueries;
  }

  return (
    <div className='bg-dark'>
      {/* <video src={videoBg}></video> */}
      <div className='container-fluid'>
        <button onClick={updateProjectData}>Update</button>
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
                <input type="text" className='form-control' id="MongoDB URL" value={mongoDBurl} onChange={(e) => {
                  setMongoDBurl(e.target.value)
                  let temp = projectData;
                  temp.config.mongoDB_URL = e.target.value;
                  setProjectData(temp);
                }}
                />
              </div>
            </div>
          </div>
          {/* For App.js code */}
          <div className="col-md-7">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>App.js Code</h4>
                <button onClick={handleCopyClickAppCode} className='btn btn-primary btn-outline-primary btn-rounded'>
                  <i className="fa-regular fa-copy"></i>  Copy
                </button>
                <Toaster />
              </div>
              <div className="card-body">
                <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateAppCode()} />
              </div>
            </div>
          </div>
        </div>

        <div className="row p-4">
          {/* For Schema Details */}
          <div className='col-md-5'>
            <div className='card'>
              <div className='card-header'>
                <h4>Schema</h4>
              </div>
              <div className="card-body">
                <p>Schema is a collection of fields that define the structure of the data that can be queried.</p>
                <label htmlFor="schema_name">Name of Schema : &nbsp;</label>
                <input type="text" className='form-control' value={schema_name} onChange={(e) => setschema_name(e.target.value)} />
                <label htmlFor="model_name">Name of Model : &nbsp;</label>
                <input type="text" className='form-control' value={model_name} onChange={(e) => setmodel_name(e.target.value)} />
              </div>
            </div>
          </div>
          {/* For Schema.js code */}
          <div className="col-md-7">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>Schema.js Code</h4>
                <button onClick={handleCopyClickSchemaCode} className='btn btn-primary btn-outline-primary btn-rounded'>
                  <i className="fa-regular fa-copy"></i>  Copy
                </button>
                <Toaster />
              </div>
              <div className="card-body">
                <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateMongoDBSchema()} />
              </div>
            </div>
          </div>
        </div>

        <EntityHandler />

      </div>
    </div >
  )
}

export default QueryGenerator;