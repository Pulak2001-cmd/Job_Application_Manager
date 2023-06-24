import { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import Login from '../components/Login';
import HomePage from '../components/HomePage';
import Signup from '../components/Signup';
import AllJob from '../components/AllJob';
import { Landing } from '../components/Landing';
import LoginPre from '../components/LoginPre';
import RegisterPre from '../components/RegisterPre';
import LoginCompany from '../components/LoginCompany';
import RegisterCompany from '../components/RegisterCompany';
import { CompanyHome } from '../components/CompanyHome';
import { AddJob } from '../components/AddJob';
import { Edit } from '../components/Edit';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState('');
  const [name, setName] = useState("");
  useEffect(() => {
    console.log(type);
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');
    if(token) {
      setLoggedIn(true);
    } else if(refresh) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {loggedIn ? (
        <Routes>
          {type === 'user' || localStorage.getItem('type') == 'user' ? <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} name={name} setName={setName} />}/>: 
          <Route path="/" element={<CompanyHome setLoggedIn={setLoggedIn} name={name} setName={setName} />}/> }
          <Route path="/jobs" element={<AllJob setLoggedIn={setLoggedIn} name={name}/>} />
          {localStorage.getItem('type') == 'company' && 
            <Route path="/add" element={<AddJob setLoggedIn={setLoggedIn} name={name}/>} />
          }
          <Route path="/edit" Component={Edit} />
        </Routes>
      ): (
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<LoginPre />} />
          <Route path='/signup' element={<RegisterPre />} />
          <Route path='/login/user' element={<Login setLoggedIn={setLoggedIn} setType={setType} />} />
          <Route path="/login/company" element={<LoginCompany setLoggedIn={setLoggedIn} setType={setType} />} />
          <Route path='/signup/user' element={<Signup setLoggedIn={setLoggedIn} />} />
          <Route path='/signup/company' element={<RegisterCompany setLoggedIn={setLoggedIn} />} />
        </Routes>
      )}
    </>
  )
}

export default App