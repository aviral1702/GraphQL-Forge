"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import Link from 'next/link';


const ManageProjects = () => {
    const [centredModal, setCentredModal] = useState(false);

    const [currentUser, setcurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [projectList, setProjectList] = useState([]);

    const toggleOpen = () => setCentredModal(!centredModal);

    const [selProject, setSelProject] = useState(null);

    const nameRef = useRef();

    const addNewProject = () => {
        fetch('http://localhost:5000/project/add', {
            method: 'POST',
            body: JSON.stringify({
                user: currentUser._id,
                name: nameRef.current.value,
                createdAt: new Date()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.status);
            toggleOpen();
            fetchProjectsData();
        }).catch((err) => {
            console.log(err);
        });
    }

    const fetchProjectsData = () => {
        fetch(`http://localhost:5000/project/getbyuser/${currentUser._id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProjectList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchProjectsData();
    }, [])


    return (
        <>
            <MDBBtn onClick={toggleOpen}>New</MDBBtn>
            <MDBModal open={centredModal} setOpen={setCentredModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Project Description</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label='Enter Project Name' ref={nameRef} placeholder='New GraphQL Project' />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={addNewProject}>Create Project</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className='list-group'>

                                {
                                    projectList.map((project) => {
                                        return (
                                            <li key={project._id} className='list-group-item'>
                                                <p>{project.name}</p>
                                                <button className='btn btn-primary btn-sm'
                                                    onClick={() => setSelProject(project)}
                                                >View</button>
                                                <button className='btn btn-danger btn-sm float-end'>Delete</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-md-9">
                            {
                                selProject !== null && (
                                    <div>
                                        <h1>{selProject.name}</h1>
                                        <p>{selProject.tagline}</p>
                                        <Link className='btn btn-primary' href={'/query_generator/' + selProject._id}>Edit Project</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageProjects;