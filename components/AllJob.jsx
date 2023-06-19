import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Loading from './Loading';
import axios from 'axios';
import BASE_URL from '../Url';
import { useNavigate } from 'react-router-dom';

export default function AllJob(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  useEffect(() =>{
    setLoading(true);
    axios.get(BASE_URL+'company/search/').then((response) => {
      console.log(response.data);
      setJobs(response.data);
      setLoading(false);
    }).catch((error) =>{
      console.log(error);
    });
  }, [])
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('refresh');
    props.setLoggedIn(false);
    navigate('/');
  }
  return ( loading ? <Loading /> :
    <div className="d-flex flex-column">
        <Navbar name={props.name} logout={logout}/>
        <div className="d-flex flex-column">
          {jobs.map((job, index) =>(
            <div key={index} className="job d-flex flex-row">
              <p>{job.company_name}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
