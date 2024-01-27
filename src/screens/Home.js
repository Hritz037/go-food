import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import Card from '../components/Card.js'
// import Carousel from "../components/Carousel.js"

const url = process.env.REACT_APP_SERVER_URL;

export default function Home() {
    const [search,setSearch]=useState("")
    const [foodCat,setFoodCat]=useState([])
    const [foodItem,setFoodItem]=useState([])

    const loadData=async ()=>{
        try{
        let response=await fetch(`{url}/api/foodData`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        });
        response=await response.json();
        // console.log(response[0],response[1])
        setFoodItem(response[0])
        setFoodCat(response[1])
    }catch(error){
        console.log(error)
    }
    }
    useEffect(()=>{
        loadData()
    },[])


    return (
        <div><div className="position-sticky" style={{top:"0",position:"fixed",width:"100%",zIndex:"11"}}><Navbar /></div><div><div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            <button className="btn btn-outline-success text-white bg-danger" onClick={(e)=>{setSearch('')}}>X</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x300/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x300/?pizza" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x300/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container justify-content-between' >
                {
                    foodCat.length>0?foodCat.map((data)=>{
                        return (<div className='row mb-3'><div key={data._id} className="fs-3 my-3">{data.CategoryName}</div>
                            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }}></hr>
                            {
                                foodItem.length>0
                                ?
                                foodItem.filter((item)=>
                                    (item.CategoryName===data.CategoryName) && 
                                    (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map((filterItem)=>{
                                        // {console.log(filterItems.options)}
                                        return(
                                            <div key={filterItem._id} className="d-flex justify-content-center col-12 col-md-6 col-lg-3">
                                                <Card foodItem={filterItem}
                                                options ={filterItem.options[0]}
                                                ></Card>
                                            </div>
                                        )
                                    })                                
                                :<div>"No such data forund"</div>
                            }
                            </div>)}
                    ):""
                }
             
                </div><div><Footer></Footer></div></div>
    )
}

