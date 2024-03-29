"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as css from './login.css';

const Login = () => {
  const router = useRouter();
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));
        toast.success('Login successful');
        router.push('/manageprojects');
      } else if (res.status === 401) {
        toast.error('Invalid credentials');
      }
      else {
        toast.error('Something went wrong');
      }
    }
  });

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className="py-5" id='login-page'>
        <div className="card" id='card'>
          <div className="card-body">
            <h1 id='title'>Have an Account ?</h1>
            <hr />
            <form onSubmit={loginForm.handleSubmit}>
              <i className="fa-solid fa-envelope"></i>
              <label htmlFor="email">EMAIL</label>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg mb-4'
                type="text"
                id='email'
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                placeholder='Enter Your Email'
              />

              <i className="fa-solid fa-key"></i>
              <label htmlFor="password">PASSWORD</label>
              <input
                className='form-control p-2 border border-gray-300 rounded-lg mb-4'
                type="password"
                id='password'
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                placeholder='Enter Your Password'
              />

              <button type="submit"
                className="btn btn-danger mb-2" id='button'>Login</button>
              <Toaster />

              <div>
                <span>
                  Don't have an account?{" "}
                  <Link href="/signup" id='signup'>Signup here</Link>
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;