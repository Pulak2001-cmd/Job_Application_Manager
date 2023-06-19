import { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import Login from '../components/Login';
import HomePage from '../components/HomePage';
import Signup from '../components/Signup';
import AllJob from '../components/AllJob';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
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
          <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} name={name} setName={setName} />}/>
          <Route path="/jobs" element={<AllJob setLoggedIn={setLoggedIn} name={name}/>} />
        </Routes>
      ): (
        <Routes>
          <Route path='/' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/signup' element={<Signup setLoggedIn={setLoggedIn} />} />
        </Routes>
      )}
    </>
  )
}

export default App
