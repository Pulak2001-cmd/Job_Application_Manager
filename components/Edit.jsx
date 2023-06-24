import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BASE_URL from '../Url';
import Loading from './Loading';
import Navbar from './Navbar';

export const Edit = () => {
    const {state} = useLocation();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState(0);
    const [jobid, setJobid] = useState("");
    const [joburl, setJoburl] = useState("");
    const [location, setLocation] = useState("");
    const [skill, setSkill] = useState("");
    const [last_date, setLastDate] = useState("");
    const [test_date, setTestDate] = useState(null);
    const [interview_date, setInterviewDate] = useState(null);
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        if (type === 'company'){
            axios.get(BASE_URL+'company/view/', { headers: {Authorization: 'Bearer ' + token}}).then((response)=>{
                console.log(response.status)
                response = response.data;
                setName(response.name);
                // setLoading(false);
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
        const jobId = state.id;
        axios.get(BASE_URL + 'company/job/'+jobId.toString(), {headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }}).then((response) =>{
            console.log(response.data);
            const data = response.data;
            setDescription(data.description);
            setExperience(data.experience);
            setJobid(data.job_id);
            setJoburl(data.job_url);
            setLocation(data.location);
            setSkill(data.skills_required);
            setLastDate(data.last_date_of_application);
            setTestDate(data.test_date);
            setInterviewDate(data.interview_date);
            setLoading(false);
        }).catch((error) =>{
            console.error(error.message);
        })
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('refresh');
        props.setLoggedIn(false);
        navigate('/');
    }
    const add = () => {
        if(description === ''){
            setError("Please add description of the job.")
            return;
        }
        if(jobid === ''){
            setError("Please add the Job ID")
            return;
        }
        if(joburl === ''){
            setError("Please add the Job URL")
            return;
        }
        if(location === ''){
            setLocation('remote');
        }
        if(last_date === ''){
            setError("Please add the Last Date of Application")
            return;
        }
        if (interview_date === ''){
            setInterviewDate(null);
        }
        if (test_date === ''){
            setTestDate(null);
        }
        const body = {
            description: description,
            company_name: name,
            experience: experience,
            job_id: jobid,
            job_url: joburl,
            location: location,
            skills_required: skill,
            publishing_time: new Date(),
            last_date_of_application: last_date,
            test_date: test_date,
            interview_date: interview_date
        }
        const token = localStorage.getItem('token');
        const jobId = state.id;
        axios.patch(BASE_URL+'company/job/'+jobId.toString()+'/', body, { headers: {Authorization: 'Bearer ' + token}}).then(response =>{
            console.log(response.data);
            alert('Job edited successfully');

        }).catch((error) =>{
            console.log(error.message);
            alert(error.message);
        })
    }
    return (
        loading ? <Loading />:
        <div>
            <Navbar name={name} logout={logout}/>
            <div className="d-flex flex-column cont1 m-auto">
                <div className="m-auto p-3">
                    <h2 className="text-primary">Edit your job</h2>
                    {error !== "" && <p className="text-danger">! {error}</p>}
                </div>
                <div class="m-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Job Description</label>
                    <textarea value={description} onChange={(e)=> setDescription(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="m-3">
                    <label for="customRange2" class="form-label">Experience</label> : {experience}
                    <input type="range" value={experience} onChange={(e)=> setExperience(e.target.value)} class="form-range" min="0" max="10" id="customRange2" />
                </div>
                <div className="m-3">
                    <label for="customRange3" class="form-label">Job ID</label>
                    <input type="text" value={jobid} onChange={(e)=> setJobid(e.target.value)} class="form-control" id="customRange3" />
                </div>
                <div className="m-3">
                    <label for="customRange4" class="form-label">Job URL</label>
                    <input type="text" value={joburl} onChange={(e)=> setJoburl(e.target.value)} class="form-control" id="customRange4" />
                </div>
                <div className="m-3">
                    <label for="customRange5" class="form-label">Location</label>
                    <input type="text" value={location} onChange={(e)=> setLocation(e.target.value)} class="form-control" id="customRange5" />
                </div>
                <div className="m-3">
                    <label for="customRange6" class="form-label">Skills required</label>
                    <input type="text" value={skill} onChange={(e)=> setSkill(e.target.value)} class="form-control" id="customRange6" />
                </div>
                <div className="m-3">
                    <label for="customRange6" class="form-label">Last Date of Application</label>
                    <input type="date" value={last_date} onChange={(e)=> setLastDate(e.target.value)} class="form-control" id="customRange6" />
                </div>
                <div className="m-3">
                    <label for="customRange6" class="form-label">Test Date</label>
                    <input type="date" value={test_date} onChange={(e) => setTestDate(e.target.value)} class="form-control" id="customRange6" />
                </div>
                <div className="m-3">
                    <label for="customRange6" class="form-label">Interview Date</label>
                    <input type="date" value={interview_date} onChange={(e) => setInterviewDate(e.target.value)} class="form-control" id="customRange6" />
                </div>
                <div className="m-auto p-2">
                    <button type="submit" class="btn btn-primary m-3 jobbtn" onClick={add}>Submit</button>
                </div>
            </div>
        </div>
    )
}
