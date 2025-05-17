import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from './utlis/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './utlis/constants';

const Login = () => {

  //State on react
  const [emailId, setEmailId] = useState("akhil@gmail.com"); //hook called as useState()
  const [password, setPassword] = useState("Akhil@12");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL +"/login", 
      {
        emailId,
        password
      },{
        withCredentials: true //Allow without https calls to set the data into cookies
      });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center m-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID: {emailId}</legend>
            <input 
              type="text" 
              value={emailId} 
              className="input" placeholder="Type here" 
              onChange={(e) => setEmailId(e.target.value)}  
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password: {password}</legend>
            <input 
              type="password" 
              value={password} 
              className="input" 
              placeholder="Type here" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
