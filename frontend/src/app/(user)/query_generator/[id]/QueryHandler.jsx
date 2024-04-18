import useGraphContext from '@/context/GraphContext';
import React, { useRef } from 'react'
import { Accordion } from 'react-bootstrap'

const QueryHandler = () => {

    const {
        queryList,
        addNewQuery,
        removeQuery,
        addParameter,
        removeQueryParameter,
    } = useGraphContext();
    const fieldNameRef = useRef();
    const fieldTypeRef = useRef();

    return (
        <div>

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
                                                    className='btn btn-danger' onClick={e => removeQueryParameter(index, query.parameters.indexOf(parameter))}>Remove</button>
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
            <button className='btn btn-primary' onClick={addNewQuery}>Add Query</button>

        </div>
    )
}

export default QueryHandler