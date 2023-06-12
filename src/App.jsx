import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import Login from '../components/Login';
import HomePage from '../components/HomePage';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {loggedIn ? (
        <Routes>
          <Route path="/" Component={HomePage} />
        </Routes>
      ): (
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/signup' Component={Signup} />
        </Routes>
      )}
    </>
  )
}

export default App
