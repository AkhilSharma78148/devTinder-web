import React, { useState } from 'react'

const Login = () => {

  //State on react
  const [emailId, setEmailId] = useState(""); //hook called as useState()
  const [password, setPassword] = useState("");

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
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
