'use client';
import { Editor } from '@monaco-editor/react';
import { MDBCard, MDBCardBody, MDBCheckbox, MDBRadio } from 'mdb-react-ui-kit';
import React, { use, useRef, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { crudOperations } from '../CrudGenerator';
import { CopyBlock, dracula } from 'react-code-blocks';
import useGraphContext from '@/context/GraphContext';
import { FIELD_TYPES } from '@/constants';

const EntityHandler = () => {

    const fieldNameRef = useRef(null);
    const fieldTypeRef = useRef(null);

    const {
        entityList,
        addNewEntity,
        addEntityField,
        updateEntityName,
        updateEntityField,
        removeEntityField,
        removeEntity,
    } = useGraphContext();


    //Generate Entity Fields
    const generateSchemaCode = () => {
        return entityList.map((entity) => {
            return `
        const ${entity.name} = new mongoose.Schema({
            ${entity.fields.map((field) => {
                return `${field.name}: ${field.type}\n\t\t`
            })}
        })
        module.exports = mongoose.model('${entity.name.toLowerCase()}',${entity.name});`
        })
    }


    const generateMongoDBSchema = () => {
        return `
        const mongoose = require('mongoose');
        ${generateSchemaCode()}
        `
    }

    return (
        <>
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
                                                <input type="text" className='form-control' value={entity.name} onChange={e => updateEntityName(index, e.target.value)} />
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
                                                    <select type="text" className="form-control" ref={fieldTypeRef} >
                                                        <option value="">Select Type</option>
                                                        {FIELD_TYPES.map((type) => (
                                                            <option value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={e => addEntityField(index, fieldNameRef.current.value, fieldTypeRef.current.value)}>Add Field</button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })
                                }
                            </Accordion>
                            <button className='btn btn-primary' onClick={addNewEntity}>Add Entity</button>

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
                        </div>
                        <div className="card-body">
                            <CopyBlock
                                theme={dracula}
                                text={generateMongoDBSchema()}
                                language={'JavaScript'}
                                showLineNumbers={true}
                                wrapLines
                            />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default EntityHandler

