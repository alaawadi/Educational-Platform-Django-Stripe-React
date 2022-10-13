


import React from 'react'
import { Link } from 'react-router-dom'

const BlogBox = (props) => {
    
    return (
        <>
            <div className="box">
                <div className="image">
                    <img src={props.image} alt="" />
                </div>
                <div className="content">
                    <div className="icons">
                        <a href="#"> <i className="fas fa-clock"></i>{props.time}</a>
                        <a href="#"> <i className="fas fa-user"></i>by {props.user}</a>
                    </div>
                    <h3>{props.title}</h3>
                    <p>{props.disc}</p>
                     <div>{props.content}</div> 
                     <div>{props.like}</div> 
                    
                    <a href="#" className="btn">{props.btn}</a>
                </div>
            </div>
        </>
    )
}

export default BlogBox










