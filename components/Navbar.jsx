import React, {useEffect, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import axios, { Axios } from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import BASE_URL from '../Url';

function Navbar(props) {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [joburl, setJobUrl] = useState("");
    const [jobStatus, setJobStatus] = useState("");
    const [errorPos1, setErrorPos1] = useState(false);
    const [errorPos2, setErrorPos2] = useState(false);
    const [errorPos3, setErrorPos3] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [dialog3, setDialog3] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');
    const [error, setError] = useState("");
    const addJob = () => {
        setDialog(true);
      }
      const closeDialog = () => {
        setDialog(false);
        setErrorPos1(false);
        setErrorPos2(false);
        setErrorPos3(false);
      }
      const divStyle = {
        display: "flex",
        felxDirection: "row",
        // position: "absolute",
        right: "0px",
        bottom: "0px",
        // padding: "1rem",
    };
    const add_applications = () => {
        var x = 0;
        if(companyName === ''){
            setErrorPos1(true);
            x=1;
        }
        if(joburl === ''){
            setErrorPos2(true);
            x=1;
        }
        if(jobStatus === ''){
            setErrorPos3(true);
            x=1;
        }
        if(x === 1){
            return;
        } else {
            const body = {
                company_name: companyName,
                job_url: joburl,
                status: jobStatus
    
            }
            axios.post(BASE_URL + 'job-application/', body, {headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'), 
            }}).then((response) => {
                setDialog(false);
                window.location.reload();
            }).catch((error) => {
                console.log(error);
                window.location.reload();
            })
        }
      }
      const change_password = async () => {
        if(password2.length <= 6){
            setError("The minimum length of the password is 6 characters");
            return;
        }
        if(password3 !== password2){
            setError("Password and Confirm Password do not match");
            return;
        }
        setLoading(true);
        const body = {
            old_password :password,
            new_password: password3
        }
        await axios.put(BASE_URL + 'user/change-password/', body, {
            headers: { 
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            setError("Password changed successfully.")
            setPassword('');
            setPassword2('');
            setPassword3('');
            setTimeout(() => {
                setDialog3(false)
            }, 2000);
        }).catch((error) => {
            console.log(error.response);
            if(error.response.status === 400){
                setError(error.response.data['old_password'][0]);
            }else{
                console.log(error.message);
            }
        })
        setLoading(false);
      }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">JobTrackr</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {localStorage.getItem('type') === 'user' && <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/jobs">All Jobs</Link>
                    </li>}
                    <li className="nav-item">
                    {localStorage.getItem('type') === 'user' ? 
                        <a className="nav-link active" aria-current="page" href="#" onClick={addJob}>Add a Job</a> : 
                        <Link className="nav-link active" aria-current="page" to="/add">Add a Job</Link>}
                    <Dialog onClose = {closeDialog} open = {dialog}>
                        <div style={{padding: '15px'}}>
                            <h4> Add Job Application </h4>
                            <h5>
                                Fill up the details below
                            </h5>
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="input1" className="form-label">Company Name</label>
                                    {errorPos1 && <p className="text-danger m-0" style={{fontSize: 12}}>! Please enter company Name</p>}
                                    <input type="text" onChange={(e)=> setCompanyName(e.target.value)} value={companyName} className="form-control input1" placeholder="Company Name" id="input1"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input2" className="form-label">Job URL</label>
                                    {errorPos2 && <p className="text-danger m-0" style={{fontSize: 12}}>! Please enter Job URL</p>}
                                    <input type="text" onChange={(e)=> setJobUrl(e.target.value)} value={joburl} className="form-control input1" placeholder="Job URL" id="input2" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input3" className="form-label">Application Status</label>
                                    {errorPos3 && <p className="text-danger m-0" style={{fontSize: 12}}>! Please enter Application Status</p>}
                                    <input className="form-control input1" onChange={(e)=> setJobStatus(e.target.value)} value={jobStatus} list="datalistOptions" placeholder="Type to search..." id="input3"/>
                                    <datalist id="datalistOptions">
                                        <option value="Applied"/>
                                        <option value="Under Consideration"/>
                                        <option value="Interview"/>
                                        <option value="Accepted"/>
                                        <option value="Declined"/>
                                    </datalist>
                                </div>
                            </div>
                            <div style = {divStyle}>
                            <button className='btn btn-success button' onClick = {add_applications}>
                                Add
                            </button>
                            <button className='btn btn-danger button' onClick = {closeDialog}>
                                Cancel
                            </button>
                            </div>
                        </div>
                    </Dialog>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">About us</a>
                    </li>
                </ul>
                    <div className="d-flex dropdown">
                        <div className="nav-link d-flex flex-row" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {localStorage.getItem('type') === 'user' ? 
                            <img src="/profile.png" height="60px" width="60px" className="profile-img" alt='profile'/> :
                            <img src="/company_logo.png" height="60px" width="60px" className="profile-img" alt='company' />}
                            <p className='m-3'>{props.name}</p>
                        </div>
                        <ul className="dropdown-menu">
                            {localStorage.getItem('type') === 'user' && <li className="dropdown-item" style={{cursor: 'pointer'}} onClick={()=> setDialog3(true)}>Change Password</li>}
                            <li className="dropdown-item" onClick={props.logout} style={{cursor: 'pointer'}}>Logout</li>
                        </ul>  
                        <Dialog onClose={()=> setDialog3(false)} open={dialog3}>
                            <div style={{padding: '15px'}}>
                                {error !== '' && <p className="text-danger">{error}</p>}
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Old Password</label>
                                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control input-email" id="exampleFormControlInput2" placeholder='Your Password' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">New Password</label>
                                    <input type="password" value={password3} onChange={(e)=> setPassword3(e.target.value)} className="form-control input-email" id="exampleFormControlInput2" placeholder='Your Password' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Confirm New Password</label>
                                    <input type="password" value={password2} onChange={(e) =>setPassword2(e.target.value)}className="form-control input-email" id="exampleFormControlInput3" placeholder='Confirm Your Password' />
                                </div>
                                <div style = {divStyle}>
                                    <button className='btn btn-success button' onClick = {change_password}>
                                        {loading ? 
                                        <div className="spinner-border text-light" role="status">
                                        </div>
                                        : 'Change'}
                                    </button>
                                    <button className='btn btn-danger button' onClick = {()=> setDialog3(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Dialog>  
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar