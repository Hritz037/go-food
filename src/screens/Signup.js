import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
require('dotenv').config();
const url = REACT_APP_SERVER_URL;

export default function Signup() {
    const navigate=useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    let [address,setAddress]=useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
          return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
          });
        }
        let latlong = await navLocation().then(res => {
          let latitude = res.coords.latitude;
          let longitude = res.coords.longitude;
          return [latitude, longitude]
        })
        // console.log(latlong)
        let [lat, long] = latlong
        console.log(lat, long)
        const response = await fetch(`{url}/api/getlocation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latlong: { lat, long } })
    
        });
        const { location } = await response.json()
        console.log(location);
        setAddress(location);
        setCredentials({ ...credentials, [e.target.name]: location })
    }
    

    const handleSubmit = async (e) => {
        // console.log({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation });
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        else{
            const response = await fetch("http://localhost:5000/api/loginuser", {
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
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
             <div>
      <Navbar />
      </div>
            <div className='container' >
                <form className='w-50 pe-5 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label m-3 mb-0">Name</label>
                        <input type="text" className="form-control m-3 mt-2" id="name" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label m-3 mb-0">Email address</label>
                        <input type="email" className="form-control m-3 mt-2 mb-0" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text m-3 mt-0">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label m-3 mb-0">Password</label>
                        <input type="password" className="form-control m-3 mt-2" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label m-3 mb-0">Address</label>
                        <fieldset>
                <input type="text" className="form-control m-3 mt-2 mb-0" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} />
              </fieldset>
              </div>
              <div className="m-3 mt-0">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success mt=0">Click for current Location </button>
            </div>
              {/* <div>
                        <input type="text" className="form-control" id="exampleInputLocation" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div> */}
                    {/* <div className="mb-3 htmlForm-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}


