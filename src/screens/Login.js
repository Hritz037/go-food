import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
// require('dotenv').config();
const url = process.env.REACT_APP_SERVER_URL;

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    // console.log({ email: credentials.email, password: credentials.password });
    e.preventDefault();
    const response = await fetch(`${url}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    else{
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div><Navbar/></div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className=" m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 mx-1 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}
