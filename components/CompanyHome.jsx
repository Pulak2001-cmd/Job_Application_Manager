import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../Url';
import axios from 'axios';
import Loading from './Loading';
import Navbar from './Navbar'
import JobPage from './JobPage';

export const CompanyHome = (props) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [jobs, setJobs] = useState([]);
    useEffect(() =>{
        setLoading(true);
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        if (type === 'company'){
            axios.get(BASE_URL+'company/view/', { headers: {Authorization: 'Bearer ' + token}}).then((response)=>{
                console.log(response.status)
                response = response.data;
                setName(response.name);
                props.setName(response.name);
                setLoading(false);
            }).catch((error)=>{
                console.log(error.message)
                const id = localStorage.getItem('id');
                const refresh = localStorage.getItem('refresh');
                if (id != null && refresh != null){
                    const params = new URLSearchParams();
                    params.append('id', id);
                    params.append('refresh', refresh);
                    axios.post(BASE_URL+'company/refresh/', params).then((response)=>{
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
        }
        const jobs = [];
        axios.get(BASE_URL+'company/job/', { headers: {Authorization: 'Bearer ' + token}}).then((response) =>{
            setJobs(response.data);
        }).catch((error) =>{
            console.log(error.message);
        })
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('refresh');
        props.setLoggedIn(false);
        navigate('/');
    }
    return (
        loading ? <Loading /> : <div>
            <Navbar logout={logout} name={name}/>
            <div className="m-auto p-3 d-flex align-items-center justify-content-center">
                <h3 className="text-primary">My Jobs</h3>
            </div>
            <JobPage jobs={jobs} />
        </div>
  )
}
