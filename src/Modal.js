import React from 'react'

import ReactDom from 'react-dom'
const MODAL_STYLE={
    position :'fixed',
    top:'50%',
    left:'50%',
    backgroundColor:'rgb(34,34,34)',
    transform:'translate(-50%,-50%)',
    zIndex:1000,
    height:"90vh",
    width:'90vw'

}
const OVERLAY_STYLES={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
}
export default function Modal({children,onClose}) {
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}/>
    <div style={MODAL_STYLE}>
        <button className="btn btn-danger py-0 px-2 fs-4" style={{position: "absolute", right: "0",marginRight:"10px",marginTop:"10px"}} onClick={onClose}>X</button>
        {children}</div></>,
        document.getElementById("cart-root")
   
  )
}
