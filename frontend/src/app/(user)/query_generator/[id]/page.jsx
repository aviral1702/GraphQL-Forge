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
import { CodeBlock, dracula } from 'react-code-blocks/dist';
import QueryHandler from './QueryHandler';
import MutationHandler from './MutationHandler';
import { crudOperations } from '../CrudGenerator';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
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
          <div className="text-center pt-4">
           <button className='btn btn-success mb-5 w-25' onClick={updateProjectData}>Update Changes</button>
         </div>
          <AppHandler />
          <EntityHandler />
          <div className="p-4">
            <div className="row">
              <div className="col-md-5">
                <QueryHandler />
                <MutationHandler />
              </div>
              <div className="col-md-7">
                <MDBCard>
                  <MDBCardBody>
                    <CodeBlock
                      text={generateGraphQLSchema()}
                      language='javascript'
                      showLineNumbers={true}
                      wrapLines={true}
                      theme={dracula}
                    />
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
        </div>
      )
    }
  </div>
}

export default QueryGenerator;