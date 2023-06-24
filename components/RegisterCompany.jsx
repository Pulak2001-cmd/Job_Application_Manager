import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Url';

function RegisterCompany() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hq, setHq] = useState("");
  const [opening, setOpening] = useState(0);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const login = ()=> {
    navigate('/login');
  }
  const signup = ()=> {
    if (validateEmail(email) === false || validateEmail(email) === null) {
        errorMessage("Please enter a valid email address");
        return;
    }
    if (name === ""){
        errorMessage("Please enter your name");
        return;
    }
    if (password === ""){
        errorMessage("Please enter a valid password");
        return;
    }
    if(password.length <= 6){
        errorMessage("The minimum length of the password is 6 characters");
        return;
    }
    if(password !== password2){
        errorMessage("Password and Confirm Password do not match");
        return;
    }
    if (hq === ""){
        errorMessage("Please enter your company head quarter");
        return;
    }
    setLoading(true);
    const body = {
      name: name,
      email: email,
      password: password,
      username: email,
      head_quarters: hq,
      openings: opening
    }
    axios.post(BASE_URL+'company/register/', body).then((response)=> {
        setLoading(false);
        successMessage("You have successfully registered");
    }).catch((error)=> {
        console.log(error.response.data);
        if(error.response.status === 400){
          setLoading(false);
          errorMessage("Your email ID is already registered. Please login.")
        }
    });
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setHq("");
    setOpening(0);
  }
  const errorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  }
  const successMessage = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  }
  return (
    <div className="d-flex m-auto flex-column align-items-center justify-content-center m-2">
        <img src="/logo.png" width="210px" height="100px" alt="Logo" />
        {error !== "" && <h5 className="text-danger">! {error}</h5>}
        {success !== "" && <h5 className="text-success">! {success}</h5>}
        {loading &&
            <div className="spinner-border text-primary" role="status">
            {/* <span className="sr-only">Loading...</span> */}
            </div>
        }
        <h2 className="text-primary">Sign Up</h2>
        <div className="d-flex flex-lg-row flex-column m-2">
            <div className='m-lg-3'>
                <div className="mb-3 mt-4">
                    <label htmlFor="exampleFormControlInput4" className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="form-control input-email" id="exampleFormControlInput4" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control input-email" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Head Quarter</label>
                    <input type="text" value={hq} onChange={(e)=> setHq(e.target.value)} className="form-control input-email" id="exampleFormControlInput2" placeholder='Company head quarter' />
                </div>
            </div>
            <div className="m-lg-3">
                <div className="mb-3 mt-lg-4">
                    <label htmlFor="exampleFormControlInput5" className="form-label">Openings</label>
                    <input type="number" value={opening} onChange={(e)=> setOpening(e.target.value)} className="form-control input-email" id="exampleFormControlInput5" placeholder='No of openings' />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput6" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control input-email" id="exampleFormControlInput6" placeholder='Your Password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput3" className="form-label">Confirm Password</label>
                    <input type="password" value={password2} onChange={(e) =>setPassword2(e.target.value)}className="form-control input-email" id="exampleFormControlInput3" placeholder='Confirm Your Password' />
                </div>
            </div>
        </div>
        <button type="button" className='btn btn-primary' onClick={signup}>Sign up</button>
            <button type="button" className='btn btn-outline-dark' onClick={login}>Already have an account? Login</button>
    </div>
  )
}

export default RegisterCompany