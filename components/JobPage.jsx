import React, { useState } from 'react';
import '../style/JobPage.css';
import axios from 'axios';
import BASE_URL from '../Url';
import { useNavigate } from 'react-router-dom';

const JobPage = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState('');
    const apply = (company_name, url, index)=> {
        setLoading(index);
        const body = {
            company_name: company_name,
            job_url: url,
            status: 'Applied'
        }
        axios.post(BASE_URL + 'job-application/', body, {headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), 
        }}).then((response) => {
            setLoading('');
            // Navigate('/');
        }).catch((error) => {
            console.log(error);
            window.location.reload();
        })
    }
    const edit = (jobId)=> {
        navigate('/edit', {
            state: {
                id: jobId
            }
        })
    }
    const jobs = props.jobs;
    return (
        <div className="pagecon m-auto mt-4">
            {jobs.map((job, index)=> (
                <div className="m-3 jobBox d-flex flex-column" key={index}>
                    <div className="d-flex flex-row justify-content-between">
                        <h3>{job.company_name}</h3>
                        {props.edit &&<div className="m-2" onClick={()=>edit(job.id)} style={{cursor: 'pointer'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                            </svg>
                        </div>}
                    </div>
                    <p className="text-secondary">{job.location}</p>
                    <div className="d-flex flex-row">
                        <p className="text-dark bgd m-1 p-2 rounded">{job.salary || '$ 180,000'}</p>
                        <p className="text-dark bgd m-1 p-2 rounded">{job.type || 'Full time'}</p>
                    </div>
                    <p className="desc text-justify">{job.description}</p>
                    <p className="exp">Experience required : {job.experience} years</p>
                    <p className="lastDate">Last Date of Application : {job.last_date_of_application}</p>
                    {job.test_date && <p className="lastDate">Online Assessment Date : {job.test_date}</p>}
                    {job.interview_date && <p className="lastDate">Interview Date : {job.interview_date}</p>}
                    {/* <p className="lastDate">Published : {getAge(job.last_date_of_application)}  days ago</p> */}
                    <p>Skills required : {job.skills_required}</p>
                    <div className="d-flex align-items-center justify-content-center">
                    {localStorage.getItem('type') === 'user' && <button className="btn btn-primary apply-btn" onClick={()=> apply(job.company_name, job.job_url, index)}>
                        {loading === index ? <div className="spinner-border text-light" role="status">
          </div>: 'Apply Now'}
                    </button>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default JobPage