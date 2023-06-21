import React, { useState } from 'react';
import '../style/JobPage.css';
import axios from 'axios';
import BASE_URL from '../Url';

const JobPage = (props) => {
    const [loading, setLoading] = useState(false);
    function getAge(creationDateString) {
        // Convert the creation date string to a Date object.
        const creationDate = new Date(creationDateString);
        console.log(creationDate);
        // Convert the current date to UTC format.
        const currentDate = new Date().toUTCString();
      
        // Calculate the difference between the current date and the creation date.
        const difference = new Date(currentDate + "-0700") - creationDate;
      
        // Return the age in days.
        return difference / (1000 * 60 * 60 * 24);
    }
    const apply = (company_name, url)=> {
        setLoading(true);
        const body = {
            company_name: company_name,
            job_url: url,
            status: 'Applied'
        }
        axios.post(BASE_URL + 'job-application/', body, {headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), 
        }}).then((response) => {
            setLoading(false);
            Navigate('/');
        }).catch((error) => {
            console.log(error);
            window.location.reload();
        })
    }
    const jobs = props.jobs;
    return (
        <div className="pagecon m-auto mt-4">
            {jobs.map((job, index)=> (
                <div className="m-3 jobBox d-flex flex-column" key={index}>
                    <h3>{job.company_name}</h3>
                    <p className="text-secondary">{job.location}</p>
                    <div className="d-flex flex-row">
                        <p className="text-dark bgd m-1 p-2 rounded">{job.salary || '$ 180,000'}</p>
                        <p className="text-dark bgd m-1 p-2 rounded">{job.type || 'Full time'}</p>
                    </div>
                    <p className="desc text-justify">{job.description}</p>
                    <p className="exp">Experience required : {job.experience} years</p>
                    <p className="lastDate">Last Date of Application : {job.last_date_of_application}</p>
                    {/* <p className="lastDate">Published : {getAge(job.last_date_of_application)}  days ago</p> */}
                    <p>Skills required : {job.skills_required}</p>
                    {localStorage.getItem('type') === 'user' && <button className="btn btn-primary" onClick={()=> apply(job.company_name, job.job_url)}>
                        {loading ? <div className="spinner-border text-light" role="status">
          </div>: 'Apply Now'}
                    </button>}
                </div>
            ))}
        </div>
    )
}

export default JobPage