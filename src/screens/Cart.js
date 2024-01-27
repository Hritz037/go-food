import React from 'react'
// import trash from "../trash.svg"
import {ReactComponent as TrashIcon} from '../trash.svg';
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data=useCart();
    let dispatch=useDispatchCart();
    if(data.length===0){
        return(
            <div>
                <div className="mt-5 w-100 text-center fs-3"> The Cart is Empty!</div>
            </div>
        )
    }
    
    const handleCheckOut= async ()=>{
        let userEmail=localStorage.getItem("userEmail")
       
        let response=await fetch("http://localhost:5000/api/orderData",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail, 
                order_date:new Date().toString()
            })
        }).catch(error=>{
            console.error("Fetch error",error)
        })
        console.log("Order Respone",response)
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }
    // trash.style.fill='white'
    let totalPrice=data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
        <div className="container m-auto mt-5 table-responsive-sm table-responsive-md" style={{ maxHeight: '70vh', overflowY: 'auto',textAlign:"center"}} >
            <table className="table table-hover" >
                <thead className="text-success fs-4 ">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody >
                        {data.map((food,index)=>(
                            <tr key={food._id}>
                                <th scope="row" >{index+1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type="button" className="btn p-0" >
                                    {/* <img src={trash}  style={{height:"20px"}}alt="delete" onClick={()=>{dispatch({
                                    type:"REMOVE",index:index
                                })}}/> */}
                                <TrashIcon viewBox="0 0 100 100" style={{fill:'white', height: '20px', width: 'auto'}} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/>
                                </button> </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div><h1 style={{position:"absolute",left:"18px",bottom:"8px"}} className="fs-2">Total Price: {totalPrice}/-</h1></div>
        <button style={{position:"absolute",right:"8px",bottom:"8px"}}className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
        </div>
    </div>
  )
}
