import React, { useState } from 'react'
import { Link, useNavigate, NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import "./NavBars.css"
import ShoppingCart from '@mui/icons-material/ShoppingCart';
export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky" style={{boxShadow: "0px 10px 20px black", filter: 'blur(20)',position:"fixed",zIndex:"11",width:"100%"}}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic me-auto " to="/">GoFood</Link>
        {(localStorage.getItem("authToken")) ?
        <div className='btn bg-white text-success mx-2 small-screen-only' style={{ position: "relative" }} onClick={() => { setCartView(true) }}><ShoppingCartIcon/>
                {data.length > 0 ? <Badge pill className="fs-7 px-2 py-1" bg="danger" style={{ position: "absolute", marginTop: "-5px" }}>{data.length}</Badge> : null}</div>:null}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link fs-5 ms-3" aria-current="page" to="/">Home</NavLink>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <NavLink className='nav-link fs-5 ms-3' aria-current="page" to="/myOrder" >My Orders</NavLink>
              </li> : ""}
          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>

              <Link className="btn bg-white text-success mx-1 ms-3 my-2 mb-3" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1 ms-2 my-2 mb-3" to="/createuser">SignUp</Link>

            </div> :
            <div className='d-flex'>
              <div className='btn bg-white text-success me-2 large-screen-only my-3' style={{ position: "relative" }} onClick={() => { setCartView(true) }}><ShoppingCart/>
                {data.length > 0 ? <Badge pill className="fs-7 px-2 py-1" bg="danger" style={{ position: "absolute", marginTop: "-5px" }}>{data.length}</Badge> : null}</div>
              {cartView ? <Modal children={<Cart />} onClose={() => { setCartView(false) }}></Modal> : null}
              <div className='btn bg-white text-danger me-2 ms-3 mb-3 mt-3' onClick={handleLogout}>Logout</div>
            </div>}

        </div>
      </div>
    </nav></div>
  )
}
