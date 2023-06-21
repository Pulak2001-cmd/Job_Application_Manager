import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterPre() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const move = ()=> {
        if(value === ''){
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }
        console.log(value);
        if(value === 'user'){
            navigate('/signup/user');
        } else {
            navigate('/signup/company');
        }
    }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 cont">
        <div className="d-flex flex-column align-items-start w-70">
            {error && <p className="m-0 text-danger">!Please select any one</p>}
            <h2>Please select any one ➡️</h2>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="company" onChange={(e)=> setValue('company')}/>
                <label class="form-check-label" for="flexRadioDefault1">
                    I am hiring
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="user" onChange={(e)=> setValue('user')}/>
                <label class="form-check-label" for="flexRadioDefault2">
                    I want to be hired
                </label>
            </div>
        </div>
        <div className="d-flex flex-row justify-content-end align-items-end" onClick={move}>
            <div className="d-flex circle-btn">
                <p>→</p>  
            </div>
        </div>
    </div>
  )
}

export default RegisterPre