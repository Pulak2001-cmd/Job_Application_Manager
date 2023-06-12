import React from 'react'
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const signup = ()=> {
    navigate('/signup');
  }
  const signin = ()=> {
    props.setLoggedIn(true);
    navigate('/');
  }
  return (
    <div className="m-auto d-flex flex-column justify-content-center align-items-center mt-5">
        <img src="/vite.svg" width="100px" height="100px" alt="Logo" />
        <h2 className="mt-4">Sign In</h2>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control input-email" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Password</label>
            <input type="password" class="form-control input-email" id="exampleFormControlInput2" placeholder='Your Password' />
        </div>
        <button type="button" className='btn btn-primary' onClick={signin}>Sign in</button>
        <p className="forgot-password">Forgot your password?</p>
        <button type="button" className='btn btn-outline-dark' onClick={signup}>Create new account</button>
    </div>
  )
}

export default Login