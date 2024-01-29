import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// require('dotenv').config();
const url = process.env.REACT_APP_SERVER_URL;


export default function MyOrder() {
    const [orderData, setOrderData] = new useState([]);
    const fetchMyOrders = async () => {
        await fetch(`${url}/api/myOrdersData`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("userEmail")
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log("myOrders", response)
            await setOrderData(response)
        })

    }
    useEffect(() => {
        fetchMyOrders()
    },[])
    return (
        <>
            <div className="position-sticky" style={{top:"0",position:"fixed",width:"100%",zIndex:"11"}}>
                <Navbar />
            </div>
            <div className="container">
                <div className="row ">
                    {orderData.length > 0 ? Array(orderData.map(data => {
                        return (
                            <div >
                                <div className="m-auto mt-5"> {data.date.split("GMT")[0]} </div>
                                <hr />
                                {data.foodItems.slice(0).reverse().map((item) => {
                                    return (
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <div className="card mt-3" style={{
                                                width: "16rem", maxHeight: "360px"
                                            }}>
                                                <img src={item.img} className="card-img-top" alt="..." style={{
                                                    height: "120px", objectFit: "fill"
                                                }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className="container w-100 p-0" style={{ height: "38px" }}></div>
                                                    <button className="me-2 bg-success">{item.qty}</button>
                                                    <span className="ms-2 me-4 ">{item.size}</span>
                                                    {/* <span className="m1"></span> */}
                                                    <div className="d-inline ms-4 h-100 w-20 fs-5">₹{item.price}/-</div>

                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>)
                    }))
                        : ""}

                </div>


            </div>
            <div>
                <Footer />
            </div>
        </>)
}


