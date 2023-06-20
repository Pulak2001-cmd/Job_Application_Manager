import React from 'react'
import '../style/Landing.css';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  const login = ()=> {
    navigate('/login');
  }
  return (
    <div className="total">
        <nav className="d-flex flex-row ml-4 justify-content-between">
            <img src='/logo.png'  width="210px" height="100px" alt="Logo" />
            <div className="m-4">
                <button className="btn btn-outline-primary landing-btn" onClick={()=> login()}>Login</button>
                <button className="btn btn-primary landing-btn register">Register</button>
            </div>
        </nav>
        <div className="d-flex flex-column justify-content-center align-items-center m-2 box-2 m-auto">
            <p className="text-primary fw-bold">Best Job Seekers around the world 💼</p>
            <p className="bigtext">Find and become a <span className="text-primary">professional</span> with passion</p>
        </div>
        <div className="box-3 m-auto">
            <p className="text-secondary">Job search platform worldwide, We connect freelancers and startups in easy way and good collaboration. We also help to manage your job applications.</p>
        </div>
        <div className="d-flex flex-row m-auto align-items-center justify-content-center">
            <button className="landing-des">front-end</button>
            <button className="landing-des">ui designer</button>
            <button className="landing-des">3d illustrator</button>
            <button className="landing-des">product manager</button>
        </div>
        <div className="d-flex flex-row m-auto align-items-center justify-content-center">
            <button className="landing-des">ux designer</button>
            <button className="landing-des">marketing</button>
            <button className="landing-des">back-end</button>
            <button className="landing-des">marketing</button>
        </div>
        <div className="d-flex flex-row p-4 footer m-auto align-items-center justify-content-center">
            <div className='col-6 text-center'>
                <h3>People Productivity performance</h3>
            </div>
            <div className='col-2 d-flex flex-column'>
                <p className='fw-bold footer-p'>JOBS</p>
                <p className='fw-bold footer-p'>1000+</p>
            </div>
            <div className='col-2 d-flex flex-column'>
                <p className='fw-bold footer-p'>STARTUPS</p>
                <p className='fw-bold footer-p'>500+</p>
            </div>
            <div className='col-2 d-flex flex-column'>
                <p className='fw-bold footer-p'>TALENTS</p>
                <p className='fw-bold footer-p'>8000+</p>
            </div>
        </div>
    </div>
  )
}
