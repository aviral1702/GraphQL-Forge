'use client';
import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const EntityHandler = () => {

    const fieldNameRef = useRef(null);
    const fieldTypeRef = useRef(null);

    //Use state for entityList, queryList, mutationList
    const [entityList, setEntityList] = useState([{
        name: 'Product',
        fields: [
            {
                name: 'id',
                type: 'ID'
            },
            {
                name: 'category',
                type: 'String'
            },
            {
                name: 'productName',
                type: 'String'
            },
            {
                name: 'price',
                type: 'Int'
            },
            {
                name: 'colors',
                type: '[String]'
            }
        ]
    }])

    const [queryList, setQueryList] = useState([
        {
            name: 'getProduct',
            parameters: [
                {
                    name: 'id',
                    type: 'ID',
                    required: true
                }
            ],
            returnType: 'Product',

        }
    ])

    const [mutationList, setMutationList] = useState([
        {
            name: 'updateProduct',
            parameters: [
                {
                    name: 'id',
                    type: 'ID',
                    required: true
                },
                {
                    name: 'category',
                    type: 'String',
                    required: true
                },
                {
                    name: 'productName',
                    type: 'String',
                    required: true
                },
                {
                    name: 'price',
                    type: 'Int',
                    required: true
                },
                {
                    name: 'colors',
                    type: '[String]',
                    required: true
                },
                {
                    name: 'imgPath',
                    type: 'String',
                    required: true
                }
            ],
        }
    ])

    //Generate Entity Fields
    const generateEntityCode = () => {
        return entityList.map((entity) => {
            return `\n
            type ${entity.name} {
                ${entity.fields.map((field) => {
                return `${field.name}: ${field.type}`
            })}
            }`
        })
    }

    //Generate Query Parameters
    const generateQueryCode = () => {
        return queryList.map((query) => {
            return `\n
            type Query{
                ${query.name}(${query.parameters.map((parameter) => {
                return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
            })}): ${query.returnType}
            }`
        })
    }

    //Generate Mutation Parameters
    const generateMutationCode = () => {
        return mutationList.map((mutation) => {
            return `\n
            type Mutation{
                ${mutation.name}(${mutation.parameters.map((parameter) => {
                return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
            })}): ${mutation.returnType}
            }`
        })
    }

    //Generate Backend Code
    const generateSchema = () => {
        return `
        const { gql } = require('apollo-server-express');
        const ProductModel = require("./models/productSchema");
        
        const mongoose = require('mongoose');
        
        exports.typeDefs = gql \`
        ${generateEntityCode()}
        ${generateQueryCode()}
        ${generateMutationCode()}
        
        const db_url = 'mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/products';
        
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
        
            Mutation: {
                updateProduct: async (parent, args) => {
                    await connect();
                    const result = ProductModel.findByIdAndUpdate(args.id, 
                        {
                            productName: args.productName,
                            category: args.category,
                            price: args.price,
                            imgPath: args.imgPath,
                            colors: args.colors
                        }, {new: true}).then((res) => {
                            if (res) {
                                return res;
                            }
                        })
                    return result;
                },
                addProduct :  async (parent, args) => {
                    await connect();
                    let product = new ProductModel({
                        productName: args.productName,
                        category: args.category,
                        price: args.price,
                        imgPath: args.imgPath,
                        colors: args.colors
                    });
                   const result = product.save().then((res) => {
                        return res;
                    })
                    return result;
                    // const result = ProductModel.insertMany([
                    //     {
                    //         productName: args.productName,
                    //         category: args.category,
                    //         price: args.price,
                    //         imgPath: args.imgPath,
                    //         colors: args.colors
                    //     }
                    // ]).then((res) => {
                    //     if (res) {
                    //         return res;
                    //     }
                    // })
                    // return result;
                },
                deleteProduct:  async (parent, args) => {
                    try {
                        await connect();
                        await ProductModel.findOneAndRemove({_id: args.id});
                        return true;
                    } catch (error) {
                        console.log('Error while delete:',error);
                        return false;
                    }    
                }
            }
        }
        `
    }

    //Copy to clipboard
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(generateSchema());
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            toast.error("Copy to clipboard failed.");
        }
    };

    //Set Entity Name
    const addEntity = () => {
        setEntityList([...entityList, {
            name: 'Untitled Entity',
            fields: [
                {
                    name: 'id',
                    type: 'ID'
                }
            ]
        }])
    }

    //Set Query Name
    const addQuery = () => {
        setQueryList([...queryList, {
            name: 'Untitled Query',
            parameters: [
                {
                    name: 'id',
                    type: 'ID',
                    required: true
                }
            ],
            returnType: 'Product'
        }])
    }

    //Set Mutation Name
    const addMutation = () => {
        setMutationList([...mutationList, {
            name: 'Untitled Mutation',
            parameters: [
                {
                    name: 'id',
                    type: 'ID',
                    required: true
                }
            ],
            returnType: 'Product'
        }])
    }

    //Set Fields of Entity
    const addField = (index) => {
        if (fieldNameRef.current.value === '' || fieldTypeRef.current.value === '') return;
        const newEntityList = [...entityList];
        newEntityList[index].fields.push({
            name: fieldNameRef.current.value,
            type: fieldTypeRef.current.value
        })
        setEntityList(newEntityList);
        fieldNameRef.current.value = '';
        fieldTypeRef.current.value = '';
    }

    //Set Parameters of Query
    const addParameter = (index) => {
        if (fieldNameRef.current.value === '' || fieldTypeRef.current.value === '') return;
        const newQueryList = [...queryList];
        newQueryList[index].parameters.push({
            name: fieldNameRef.current.value,
            type: fieldTypeRef.current.value
        })
        setQueryList(newQueryList);
        fieldNameRef.current.value = '';
        fieldTypeRef.current.value = '';
    }

    //Set Parameters of Mutation
    const addMutationParameter = (index) => {
        if (fieldNameRef.current.value === '' || fieldTypeRef.current.value === '') return;
        const newMutationList = [...mutationList];
        newMutationList[index].parameters.push({
            name: fieldNameRef.current.value,
            type: fieldTypeRef.current.value
        })
        setMutationList(newMutationList);
        fieldNameRef.current.value = '';
        fieldTypeRef.current.value = '';
    }

    //Remove Entity
    const removeEntity = (index) => {
        const newEntityList = [...entityList];
        newEntityList.splice(index, 1);
        setEntityList(newEntityList);
    }

    //Remove Query
    const removeQuery = (index) => {
        const newQueryList = [...queryList];
        newQueryList.splice(index, 1);
        setQueryList(newQueryList);
    }

    //Remove Mutation
    const removeMutation = (index) => {
        const newMutationList = [...mutationList];
        newMutationList.splice(index, 1);
        setMutationList(newMutationList);
    }

    //Remove Field of Entity
    const removeEntityField = (EntityIndex, fieldIndex) => {
        const newEntityList = [...entityList];
        newEntityList[EntityIndex].fields.splice(fieldIndex, 1);
        setEntityList(newEntityList);
    }

    //Remove Query Parameter
    const removeQueryParameter = (queryIndex, parameterIndex) => {
        const newQueryList = [...queryList];
        newQueryList[queryIndex].parameters.splice(parameterIndex, 1);
        setQueryList(newQueryList);
    }

    //Remove Mutation Parameter
    const removeMutationParameter = (mutationIndex, parameterIndex) => {
        const newMutationList = [...mutationList];
        newMutationList[mutationIndex].parameters.splice(parameterIndex, 1);
        setMutationList(newMutationList);
    }

    //Update Entity Name
    const updateEntityName = (e, index) => {
        const newEntityList = [...entityList];
        newEntityList[index].name = e.target.value;
        setEntityList(newEntityList);
    }

    //Update Query Name
    const updateQueryName = (e, index) => {
        const newQueryList = [...queryList];
        newQueryList[index].name = e.target.value;
        setQueryList(newQueryList);
    }

    //Update Mutation Name
    const updateMutationName = (e, index) => {
        const newMutationList = [...mutationList];
        newMutationList[index].name = e.target.value;
        setMutationList(newMutationList);
    }

    return (
        <div className="row p-4">
            {/* For Operations Code */}
            <div className='col-md-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Operations</h4>
                        <Accordion defaultActiveKey="0">
                            {
                                entityList.map((entity, index) => {
                                    return <Accordion.Item eventKey={index}>
                                        <Accordion.Header>
                                            <input type="text" className='form-control' value={entity.name} onChange={e => updateEntityName(e,index)} />
                                            <button className='btn btn-danger' onClick={e => removeEntity(index)}>Remove</button>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul className='list-group'>
                                                {
                                                    entity.fields.map((field) => {
                                                        return <li className='list-group-item d-flex justify-content-between'>
                                                            <p>{field.name} : {field.type}</p>
                                                            <button
                                                                className='btn btn-danger' onClick={
                                                                    e => removeEntityField(index, entity.fields.indexOf(field))
                                                                }>Remove</button>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                            <div className="input-group">
                                                <input type="text" className="form-control" ref={fieldNameRef} />
                                                <input type="text" className="form-control" ref={fieldTypeRef} />
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={e => addField(index)}>Add Field</button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })
                            }
                        </Accordion>
                        <button className='btn btn-primary' onClick={addEntity}>Add Entity</button>

                        <Accordion defaultActiveKey="0">
                            {
                                queryList.map((query, index) => {
                                    return <Accordion.Item eventKey={index}>
                                        <Accordion.Header>
                                            <input type="text" className='form-control' value={query.name} onChange={e => updateQueryName(e, index)} />
                                            <button className='btn btn-danger' onClick={e => removeQuery(index)}>Remove</button>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul className='list-group'>
                                                {
                                                    query.parameters.map((parameter) => {
                                                        return <li className='list-group-item d-flex justify-content-between'>
                                                            <p>{parameter.name} : {parameter.type}</p>
                                                            <button
                                                                className='btn btn-danger' onClick={e => removeQueryParameter(index,query.parameters.indexOf(parameter))}>Remove</button>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                            <div className="input-group">
                                                <input type="text" className="form-control" ref={fieldNameRef} />
                                                <input type="text" className="form-control" ref={fieldTypeRef} />
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={e => addParameter(index)}>Add Parameter</button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })
                            }
                        </Accordion>
                        <button className='btn btn-primary' onClick={addQuery}>Add Query</button>

                        <Accordion defaultActiveKey="0">
                            {
                                mutationList.map((mutation, index) => {
                                    return <Accordion.Item key={index}>
                                        <Accordion.Header>
                                            <input type="text" className='form-control' value={mutation.name} onChange={
                                                e => updateMutationName(e, index)
                                            } />
                                            <button className='btn btn-danger' onClick={e => removeMutation(index)}>Remove</button>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul className='list-group'>
                                                {
                                                    mutation.parameters.map((parameter) => {
                                                        return <li className='list-group-item d-flex justify-content-between'>
                                                            <p>{parameter.name} : {parameter.type}</p>
                                                            <button
                                                                className='btn btn-danger' onClick={e => removeMutationParameter(index,mutation.parameters.indexOf(parameter))}>Remove</button>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                            <div className="input-group">
                                                <input type="text" className="form-control" ref={fieldNameRef} />
                                                <input type="text" className="form-control" ref={fieldTypeRef} />
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={e => addMutationParameter(index)}>Add Mutation Parameter</button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })
                            }
                        </Accordion>
                        <button className='btn btn-primary' onClick={addMutation}>Add Mutation</button>
                    </div>
                    <div className="card-body">

                        <div className='types-editor'>

                        </div>

                    </div>
                </div>
            </div>
            {/* For GraphQLSchema.js code */}
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h4>GraphQLSchema.js Code</h4>
                        <button onClick={handleCopyClick} className='btn btn-primary btn-outline-primary btn-rounded'>
                            <i className="fa-regular fa-copy"></i>  Copy
                        </button>
                        <Toaster />
                    </div>
                    <div className="card-body">
                        <Editor theme='vs-dark' height="50vh" defaultLanguage="javascript" value={generateSchema()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntityHandler

