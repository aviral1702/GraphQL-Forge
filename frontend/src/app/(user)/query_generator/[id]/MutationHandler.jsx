import useGraphContext from '@/context/GraphContext';
import { MDBCard, MDBCardBody, MDBRadio } from 'mdb-react-ui-kit';
import React from 'react'
import { Accordion } from 'react-bootstrap';

const mutationOptions = ['add', 'update', 'delete'];
const queryOptions = ['readAll', 'readByField', 'readById'];

const MutationHandler = () => {

    const { mutationList } = useGraphContext();

    return (
        <div>
            <MDBCard className='my-5'>
                <MDBCardBody>
                    <Accordion defaultActiveKey="0">
                        {
                            mutationList.map((mutation, index) => {
                                return <><Accordion.Item key={index}>
                                    <Accordion.Header>
                                        <input type="text" className='form-control' value={mutation.name} onChange={
                                            e => updateMutationName(e, index)
                                        } />
                                        <button className='btn btn-danger' onClick={e => removeMutation(index)}>Remove</button>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row">
                                            {/* <div className="col-md-4">
                                            <ul className='list-group'>
                                                {
                                                    mutation.parameters.map((parameter) => {
                                                        return <li className='list-group-item d-flex justify-content-between'>
                                                            <p>{parameter.name} : {parameter.type}</p>
                                                            <button
                                                                className='btn btn-danger' onClick={e => removeMutationParameter(index, mutation.parameters.indexOf(parameter))}>Remove</button>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div> */}
                                            <div className="col-md-4">
                                                {
                                                    mutationOptions.map((option) => (

                                                        <MDBRadio label={option} name={mutation.name} checked={mutation.type === option}
                                                            onChange={
                                                                e => {
                                                                    const newMutationList = [...mutationList];
                                                                    newMutationList[index].type = option;
                                                                    setMutationList(newMutationList);
                                                                }
                                                            }
                                                        />
                                                    ))
                                                }

                                            </div>
                                            <div className="col-md-4"></div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                    {/* <div className="input-group mt-5">
                                        <input type="text" className="form-control" ref={fieldNameRef} />
                                        <input type="text" className="form-control" ref={fieldTypeRef} />
                                        <button
                                            className='btn btn-primary'
                                            onClick={e => addMutationParameter(index)}>Add Mutation Parameter</button>
                                    </div> */}
                                </>
                            })
                        }
                    </Accordion>
                    <button className='btn btn-primary' onClick={addMutation}>Add Mutation</button>

                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default MutationHandler;