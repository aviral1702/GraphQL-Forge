'use client';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import EntityHandler from './EntityHandler';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { Accordion } from 'react-bootstrap';
import useGraphContext from '@/context/GraphContext';

import AppHandler from './AppHandler';
import { CodeBlock } from 'react-code-blocks/dist';
import QueryHandler from './QueryHandler';
import MutationHandler from './MutationHandler';
import { crudOperations } from '../CrudGenerator';
// import videoBg from '../assets/Untitled_design.mp4';

const QueryGenerator = () => {

  const fieldNameRef = useRef(null);
  const fieldTypeRef = useRef(null);

  const {
    queryList,
    mutationList,
    entityList,
    mongoDbUrl,
    setMongoDbUrl,
    loadProject,
    addNewQuery,
    addEntityField,
    updateEntityName,
    updateEntityField,
    removeEntityField,
    updateProjectData,
    isProjectLoading,

    addNewMutation,
    addNewEntity,
    updateQueryName,
    updateQueryParameter,
    updateQueryReturnType,
    removeQueryParameter,
    updateMutationName,
    updateMutationParameter,
    updateMutationReturnType,
    removeMutationParameter
  } = useGraphContext();

  const { id } = useParams();


  const fetchProjectData = async () => {
    await fetch(`http://localhost:5000/project/getbyid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadProject(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generateEntityCode = () => {
    return entityList.map((entity) => {
      return `type ${titleCase(entity.name)}{
        ${entity.fields.map((field) => {
        return `${field.name}: ${field.type}`
      })}
      }`
    })
  }

  const generateMutationCode = () => {
    return mutationList.map((mutation) => {
      return `
        type Mutation{
            ${mutation.name}(${mutation.parameters.map((parameter) => {
        return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
      })}): ${mutation.returnType}
        }`
    })
  }

  const generateQueryCode = () => {
    return queryList.map((query) => {
      return `
      type Query{
          ${query.name}(${query.parameters.map((parameter) => {
        return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
      })}): ${query.returnType}
      }`
    })
  }

  const generateGraphQLSchema = () => {
    return `
    const { gql } = require('apollo-server-express');
    ${entityList.map((entity) => (
      `const ${titleCase(entity.name)}Model = require("./models/${entity.name}Schema");`
    ))
      }
    const mongoose = require('mongoose');
    
    exports.typeDefs = gql \`
    ${generateEntityCode()}
    ${generateQueryCode()}
    ${generateMutationCode()}
    
    const db_url = "${mongoDbUrl}";
    const connect = async () => {
        await mongoose.connect(db_url, { useNewUrlParser: true });
    }
    
    exports.resolvers = {
        Query: {
            getProductsList: async (parent, args) => {
                await connect();
                const result = ProductModel.find({}).then((res) => {
                    if (res) {
                        return res;
                    }
                })
                return result;
            },
            getProduct: async (parent, args) => {
                await connect();
                const result = ProductModel.findById(args.id).then((res) => {
                    if (res) {
                        return res;
                    }
                })
                return result;
            }
        },

        ${entityList.map((entity) => (
        `Mutation: {
    ${mutationList.map((mutation) => (
          `\n\n\t\t\t\t${mutation.name}: async (parent, args) => {
                           await connect();
                           const result = ${crudOperations[mutation.type](entity.name)}
                           return result;
                        }`))}      
                }`))}   
        }
}`
  }

  useEffect(() => {
    fetchProjectData();
  }, []);


  //App.js Code


  //Schema.js Code


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

  // return (
  //   <div className='bg-dark pt-5'>
  //     {/* <video src={videoBg}></video> */}
  //     <div className='container-fluid pt-3'>
  //       {/* <button className='btn btn-success' onClick={updateProjectData}>Update Changes</button> */}


  //       <div className="row p-4">
  //         {/* For Schema Details */}
  //         <div className='col-md-5'>
  //           <div className='card'>
  //             <div className='card-header'>
  //               <h4>Schema</h4>
  //             </div>
  //             <div className="card-body">
  //               <p>Schema is a collection of fields that define the structure of the data that can be queried.</p>
  //               <label htmlFor="schema_name">Name of Schema : &nbsp;</label>
  //               {/* <input type="text" className='form-control' value={schema_name} onChange={(e) => setschema_name(e.target.value)} /> */}
  //               <Accordion defaultActiveKey="0">
  //                 {
  //                   entityList.map((entity, index) => {
  //                     return <Accordion.Item eventKey={index}>
  //                       <Accordion.Header>
  //                         <input type="text" className='form-control' value={entity.name} onChange={e => updateEntityName(e, index)} />
  //                       </Accordion.Header>
  //                       <Accordion.Body>
  //                         <ul className='list-group'>
  //                           {
  //                             entity.fields.map((field) => {
  //                               return <li className='list-group-item d-flex justify-content-between'>
  //                                 <p>{field.name} : {field.type}</p>
  //                                 <button
  //                                   className='btn btn-danger' onClick={
  //                                     e => removeEntityField(index, entity.fields.indexOf(field))
  //                                   }>Remove</button>
  //                               </li>
  //                             })
  //                           }
  //                         </ul>
  //                         <div className="input-group">
  //                           <input type="text" className="form-control" ref={fieldNameRef} />
  //                           <input type="text" className="form-control" ref={fieldTypeRef} />
  //                           <button
  //                             className='btn btn-primary'
  //                             onClick={e => addField(index)}>Add Field</button>
  //                         </div>
  //                       </Accordion.Body>
  //                     </Accordion.Item>
  //                   })
  //                 }
  //               </Accordion>
  //               <label htmlFor="model_name">Name of Model : &nbsp;</label>
  //               <input type="text" className='form-control' value={model_name} onChange={(e) => setmodel_name(e.target.value)} />
  //             </div>
  //           </div>
  //         </div>
  //         {/* For Schema.js code */}
  //         <div className="col-md-7">
  //           <div className="card">
  //             <div className="card-header d-flex justify-content-between">
  //               <h4>Schema.js Code</h4>
  //               <button onClick={handleCopyClickSchemaCode} className='btn btn-primary btn-outline-primary btn-rounded'>
  //                 <i className="fa-regular fa-copy"></i>  Copy
  //               </button>
  //               <Toaster />
  //             </div>
  //             <div className="card-body">
  //               <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateMongoDBSchema()} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <EntityHandler />
  //       <div className="text-center">
  //         <button className='btn btn-success mb-5 w-25' onClick={updateProjectData}>Update Changes</button>
  //       </div>

  //     </div>
  //   </div >
  // )

  const titleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
  }

  return <div className='bg-dark py-5'>
    {
      isProjectLoading() ? (
        <h3 className='text-muted display-3 my-4 text-center'>Loading ... </h3>
      ) : (
        <div>
          <AppHandler />
          <EntityHandler />

          <div className="row">
            <div className="col-md-6">
              <QueryHandler />
              <MutationHandler />
            </div>
            <div className="col-md-6">
              <CodeBlock
                text={generateGraphQLSchema()}
                language='javascript'
                showLineNumbers={true}
                wrapLines={true}
                theme='dracula'
              />
            </div>
          </div>
        </div>
      )
    }
  </div>
}

export default QueryGenerator;