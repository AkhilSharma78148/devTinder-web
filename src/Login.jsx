import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from './utlis/userSlice';

const Login = () => {

  //State on react
  const [emailId, setEmailId] = useState("akhil@gmail.com"); //hook called as useState()
  const [password, setPassword] = useState("Akhil@12");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password
      },{
        withCredentials: true //Allow without https calls to set the data into cookies
      });
      console.log(res.data);
      dispatch(addUser(res.data));
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
