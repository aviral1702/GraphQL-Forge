import { FIELD_CONSTRAINTS, FIELD_TYPES } from '@/constants';
import useGraphContext from '@/context/GraphContext';
import React, { useRef } from 'react'
import { Accordion } from 'react-bootstrap'

const QueryHandler = () => {

    const {
        queryList,
        updateQueryName,
        addNewQuery,
        removeQuery,
        addParameter,
        removeQueryParameter,
        addQueryParameter,
    } = useGraphContext();
    const fieldNameRef = useRef();
    const fieldTypeRef = useRef();
    const fieldConstraintRef = useRef();

    return (
        <div>

            <Accordion defaultActiveKey="0">
                {
                    queryList.map((query, index) => {
                        return <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <input type="text" className='form-control' value={query.name} onChange={e => updateQueryName(index, e.target.value)} />
                                <button className='btn btn-danger' onClick={e => removeQuery(index)}>Remove</button>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className='list-group'>
                                    {
                                        query.parameters.map((parameter) => {
                                            return <li className='list-group-item d-flex justify-content-between'>
                                                <p>{parameter.name} : {parameter.type}</p>
                                                <button
                                                    className='btn btn-danger' onClick={e => removeQueryParameter(index, query.parameters.indexOf(parameter))}>Remove</button>
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
                                    <select type="text" className="form-control" ref={fieldConstraintRef} >
                                        <option value="">Select Constraint</option>
                                        {FIELD_CONSTRAINTS.map((constraint) => (
                                            <option value={constraint}>{constraint}</option>
                                        ))}
                                    </select>
                                    
                                    <button
                                        className='btn btn-primary'
                                        onClick={e => addQueryParameter(index, fieldNameRef.current.value, fieldTypeRef.current.value, fieldConstraintRef.current.value)}>Add Parameter</button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    })
                }
            </Accordion>
            <button className='btn btn-primary' onClick={addNewQuery}>Add Query</button>

        </div>
    )
}

export default QueryHandler