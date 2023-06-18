import React, { useEffect, useState } from 'react';
import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../Url';
import axios from 'axios';
import Loading from './Loading';
import Dialog from "@mui/material/Dialog";

function HomePage(props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [option, setOption] = useState('');
  const [companyName, setCompanyName] = useState("");
  const [joburl, setJobUrl] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [errorPos1, setErrorPos1] = useState(false);
  const [errorPos2, setErrorPos2] = useState(false);
  const [errorPos3, setErrorPos3] = useState(false);
  const logout = () => {
    localStorage.removeItem('token');
    props.setLoggedIn(false);
    navigate('/');
  }
  const [speciality, setSpeciality] = useState([
    'Software Development',
    'Backend Development',
    'UI/UX Design',
    'Database Development',
  ]);
  const salaryType = ['Hourly wage', 'Monthly', 'Yearly'];
  const employment = ["Full time", "Senior level", "Remote", "Contract"];
    const divStyle = {
        display: "flex",
        felxDirection: "row",
        // position: "absolute",
        right: "0px",
        bottom: "0px",
        // padding: "1rem",
    };
  const [job_list, setJob_list] = useState([]);
  const addJob = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
    setErrorPos1(false);
    setErrorPos2(false);
    setErrorPos3(false);
  }
  useEffect(()=> {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get(BASE_URL+'user/', { headers: {Authorization: 'Bearer ' + token}}).then((response)=>{
        response = response.data;
        const user = response.user;
        const job_applications = response.job_applications;
        console.log(job_applications);
        setName(user.name);
        setJob_list(job_applications);
        setLoading(false);
    }).catch((error)=>{
        const id = localStorage.getItem('id');
        // axios.post(BASE_URL+'user/refresh/', {id: id}).then((response)=>{

        // })
        localStorage.removeItem('token');
        props.setLoggedIn(false);
        navigate('/')
    })
  }, []);
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
            console.log(response);
            setDialog(false);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }
  }
  return (
    loading ? <Loading/> : <div className="d-flex flex-column">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">JobTrackr</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Your Jobs</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#" onClick={addJob}>Add a Job</a>
                    <Dialog onClose = {closeDialog} open = {dialog}>
                        <div style={{padding: '15px'}}>
                            <h4> Add Job Application </h4>
                            <h5>
                                Fill up the details below
                            </h5>
                            <div>
                                <div className="mb-3">
                                    <label for="input1" className="form-label">Company Name</label>
                                    {errorPos1 && <p className="text-danger m-0" style={{fontSize: 12}}>! Please enter company Name</p>}
                                    <input type="text" onChange={(e)=> setCompanyName(e.target.value)} value={companyName} className="form-control input1" placeholder="Company Name" id="input1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="input2" className="form-label">Job URL</label>
                                    {errorPos2 && <p className="text-danger m-0" style={{fontSize: 12}}>! Please enter Job URL</p>}
                                    <input type="text" onChange={(e)=> setJobUrl(e.target.value)} value={joburl} className="form-control input1" placeholder="Job URL" id="input2" />
                                </div>
                                <div className="mb-3">
                                    <label for="input3" className="form-label">Application Status</label>
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
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">About us</a>
                    </li>
                </ul>
                    <div class="d-flex dropdown">
                        <div class="nav-link d-flex flex-row" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/profile.png" height="60px" width="60px" class="profile-img" alt='profile'/>
                            <p className='m-3'>{name}</p>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li class="dropdown-item" onClick={logout} style={{cursor: 'pointer'}}>Logout</li>
                        </ul>    
                    </div>
                </div>
            </div>
        </nav>
        <div className="container justify-content-center align-items-center d-flex">
            <div className="search-container d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                    <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </div>
                    <div className="search-input">
                        <input type="text" placeholder='Job Title or keyword' />
                    </div>
                </div>
                <div className="search-btn">Submit</div>
            </div>
        </div>
        <div className="m-lg-4 d-flex flex-column flex-lg-row align-items-center">
            <div className="col-lg-3 d-flex flex-column align-items-center justify-content-center m-lg-4 align-items-lg-start">
                <h4 className="mt-3">Filter</h4>
                <input type="text" placeholder="Company, skill, tags..." className='skill-input'/>
                <div className="m-2 m-lg-4">
                    <h5 onClick={()=> setOption('speciality')}>Speciality 
                        {option !== 'speciality' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'speciality' && speciality.map((i, index)=> (
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                {i}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="m-4">
                    <h5 onClick={()=> setOption('employment')}>Employment 
                        {option !== 'employment' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'employment' && employment.map((i, index)=> (
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                {i}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="m-lg-4">
                    <h5 onClick={()=> setOption('salaryType')}>Salary type 
                        {option !== 'salaryType' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'salaryType' && salaryType.map((i, index)=> (
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                {i}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
                
            </div>
            <div className="col-lg-7">
                {job_list.map((job, index) =>(
                    <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center job" key={job.id}>
                        <div className="url">
                            <a href={job.job_url} className="text-dark">{job.job_url}</a>
                        </div>
                        <div className="name">
                            <h6>{job.company_name || 'Company Name'}</h6>
                        </div>
                        <div className="skills flex-row d-flex">
                                <div className='tag'>
                                    {job.status}
                                </div>
                        </div>
                        <div className="location">
                            <p>{job.location || 'Remote'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage