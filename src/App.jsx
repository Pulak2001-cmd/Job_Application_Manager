import { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import Login from '../components/Login';
import HomePage from '../components/HomePage';
import Signup from '../components/Signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {loggedIn ? (
        <Routes>
          <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} />}/>
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
