import React, {useEffect, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [joburl, setJobUrl] = useState("");
    const [jobStatus, setJobStatus] = useState("");
    const [errorPos1, setErrorPos1] = useState(false);
    const [errorPos2, setErrorPos2] = useState(false);
    const [errorPos3, setErrorPos3] = useState(false);
    const [dialog, setDialog] = useState(false);
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
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">JobTrackr</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/jobs">All Jobs</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" onClick={addJob}>Add a Job</a>
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
                            <img src="/profile.png" height="60px" width="60px" className="profile-img" alt='profile'/>
                            <p className='m-3'>{props.name}</p>
                        </div>
                        <ul className="dropdown-menu">
                            {/* <li><a className="dropdown-item" href="#">Profile</a></li> */}
                            <li className="dropdown-item" onClick={props.logout} style={{cursor: 'pointer'}}>Logout</li>
                        </ul>    
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar