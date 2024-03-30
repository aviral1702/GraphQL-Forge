import React from 'react'

const Profile = () => {
    return (
        <div className='vh-100 bg-primary pt-5'>
            <div className="row bg-dark m-5">
                <div className='text-white col-md-4 p-4'>
                    <h1 className='text-center'>Profile</h1>
                    <div className='p-5 fs-4'>
                        <img src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=" class="img-thumbnail" alt="..."></img>
                    </div>
                </div>
                <div className='text-white col-md-8 p-4'>
                    <h1 className='text-center'>Details here</h1>
                    <div className='p-5 fs-4'>
                        <p>Name : </p>
                        <p>Email ID : </p>
                        <p>Gender : </p>
                        <p>Phone No. : </p>
                        <a href=''>LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile