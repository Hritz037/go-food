import React,{useState, useEffect, useRef} from 'react'
import {useDispatchCart, useCart} from './ContextReducer'
export default function Card(props) {
    const priceRef=useRef();
    let dispatch =useDispatchCart();
    let data=useCart();
    let options=props.options;
    let priceOptions=Object.keys(options)
    let foodItem=props.foodItem;
    const [size,setSize]=useState("");
    const [qty,setQty]=useState(1);
    let finalPrice=qty*parseInt(options[size]);

    const handleAddToCart= async()=>{
        let food=null
        for( const item of data){
            if(item.id===foodItem._id && item.size===size){
                food=item;
                break;
            }
        }
        
        // if(food)console.log(food)
        if(food){
                await dispatch({type:"UPDATE",id:foodItem._id,size:size,price:finalPrice,qty:qty})
                return
        }
        
       await dispatch({type:"ADD",
            id:foodItem._id,
            name:foodItem.name,
            price:finalPrice,
            qty:qty,
            size:size,
            img:foodItem.img})
            // console.log(data)
    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, []);
    return (
        <><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px"}}>
                    <img className="card-img-top" src={foodItem.img} alt="Card image cap" style={{height:"160px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        {/* <p className="card-text">on the card title card's content.</p> */}
                        <div className="container w-100 px-1 d-flex">
                            <div className='me-auto'>
                            <select name="" id="" className="my-2 h-70 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={(i + 1)}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="" id="" className="mx-4 h-70 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>
                            </div>
                            <div className='d-inline h-100 mt-1'>
                            ₹{options[size]}/-
                            </div>

                        </div>
                        <hr></hr>
                        <button className="btn btn-success justify-content ms-1" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </>
    )
}
