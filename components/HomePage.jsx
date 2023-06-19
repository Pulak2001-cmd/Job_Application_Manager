import React, { useEffect, useState } from 'react';
import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../Url';
import axios from 'axios';
import Loading from './Loading';
import Navbar from './Navbar';

function HomePage(props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [option, setOption] = useState('');
  
  const [speciality, setSpeciality] = useState([
    'Software Development',
    'Backend Development',
    'UI/UX Design',
    'Database Development',
  ]);
  const salaryType = ['Hourly wage', 'Monthly', 'Yearly'];
  const employment = ["Full time", "Senior level", "Remote", "Contract"];
    
  const [job_list, setJob_list] = useState([]);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('refresh');
    props.setLoggedIn(false);
    navigate('/');
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
        props.setName(user.name);
        setJob_list(job_applications);
        setLoading(false);
    }).catch((error)=>{
        const id = localStorage.getItem('id');
        const refresh = localStorage.getItem('refresh');
        if (id != null && refresh != null){
            const params = new URLSearchParams();
            params.append('id', id);
            params.append('refresh', refresh);
            axios.post(BASE_URL+'user/refresh/', params).then((response)=>{
                localStorage.setItem('token', response.data.token);
                window.location.reload();
            }).catch((error1)=>{
                console.log("Error in refresh token");
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('refresh');
                props.setLoggedIn(false);
                navigate('/')
            })
        } else {
            localStorage.removeItem('id');
            localStorage.removeItem('refresh');
            localStorage.removeItem('token');
            props.setLoggedIn(false);
            navigate('/');
        }
    })
  }, []);

  return (
    loading ? <Loading/> : <div className="d-flex flex-column">
        <Navbar logout={logout} name={name}/>
        <div className="container justify-content-center align-items-center d-flex">
            <div className="search-container d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                    <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'speciality' && speciality.map((i, index)=> (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {i}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="m-4">
                    <h5 onClick={()=> setOption('employment')}>Employment 
                        {option !== 'employment' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'employment' && employment.map((i, index)=> (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {i}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="m-lg-4">
                    <h5 onClick={()=> setOption('salaryType')}>Salary type 
                        {option !== 'salaryType' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>}
                    </h5>
                    <div className="align-items-start">
                    {option === 'salaryType' && salaryType.map((i, index)=> (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
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