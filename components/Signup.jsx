import React from 'react';
import '../style/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const login = ()=> {
    navigate('/');
  }
  return (
    <div className="d-flex flex-lg-row align-items-center justify-content-center mt-5 flex-md-row flex-column">
        <div className="col-5 d-flex flex-column justify-content-center align-items-center">
            <img src="/vite.svg" width="100px" height="100px" alt="Logo" />
            <h2 className="mt-4">Sign Up</h2>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control input-email" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Password</label>
                <input type="password" class="form-control input-email" id="exampleFormControlInput2" placeholder='Your Password' />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">Confirm Password</label>
                <input type="password" class="form-control input-email" id="exampleFormControlInput3" placeholder='Your Password' />
            </div>
            <button type="button" className='btn btn-primary'>Sign up</button>
            <button type="button" className='btn btn-outline-dark' onClick={login}>Already have an account? Login</button>
        </div>
        <div className='col-5 d-none d-lg-flex d-md-flex'>
            <img src="/Interview.jpeg" height="100%"/>
        </div>
      </div>
  )
}

export default Signup