import React, { useState } from 'react'
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Url';

function LoginCompany(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const signup = ()=> {
    navigate('/signup');
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const errorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 4000);
  }
  const signin = async()=> {
    // props.setLoggedIn(true);
    // navigate('/');
    if (validateEmail(email) === false || validateEmail(email) === null) {
      errorMessage("Please enter a valid email address");
      return;
    }
    if(password.length <= 6){
      errorMessage("Please enter a valid password");
      return;
    }
    setLoading(true);
    const body = {
      email: email,
      password: password
    }
    await axios.post(BASE_URL+'company/login/', body, {
      withCredentials: true,
    }).then((response) => {
        console.log(response.data);
    //   const token = response.data.token;
    //   const refreshtoken = response.data.refresh;
    //   const id = response.data.id;
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('id', id);
    //   localStorage.setItem('refresh', refreshtoken);
    //   props.setLoggedIn(true);
    //   navigate('/');
    }).catch((error) => {
      const details = error.response.data.detail;
      errorMessage(details);
    })
    setLoading(false);
    // setEmail("");
    // setPassword("");
  }
  
  return (
    <div className="m-auto d-flex flex-column justify-content-center align-items-center mt-5">
        <img src="/logo.png" width="210px" height="100px" alt="Logo" />
        {error !== "" && <h5 className="text-danger">! {error}</h5>}
        {loading && 
          <div className="spinner-border text-primary" role="status">
          </div>
        }
        <h2 className="mt-4">Sign In</h2>
        <div className="mb-3 mt-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control input-email" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control input-email" id="exampleFormControlInput2" placeholder='Your Password' />
        </div>
        <button type="button" className='btn btn-primary' onClick={signin}>Sign in</button>
        <p className="forgot-password">Forgot your password?</p>
        <button type="button" className='btn btn-outline-dark' onClick={signup}>Create new account</button>
    </div>
  )
}

export default LoginCompany