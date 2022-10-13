
import React from 'react'
import { Link } from 'react-router-dom'

const ServBox = (props) => {
    
    return (
        <>

            


<div className="box">
        <img src={props.image} alt="" />
        <h3>{props.title}</h3>
        <p>{props.disc}</p>
        <Link className="btn" to={`/servdetail/${props.id}`}>{props.btn}</Link>
    </div>

        </>
    )
}

export default ServBox
