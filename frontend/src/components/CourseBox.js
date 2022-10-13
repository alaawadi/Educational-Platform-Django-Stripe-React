import React from 'react'
import { Link } from 'react-router-dom'

const CourseBox = (props) => {
    
    return (
        <>

            

                <div className="box">
                    <div className="image">
                        <img src={props.image} alt="" />
                    </div>
                    <div className="content">
                        <span>{props.category}</span>
                        <h3>{props.title}</h3>
                        <p>{props.disc}</p>
                        <Link to={`/video/${props.id}`}><a className="btn">{props.btn}</a></Link>
                        <div className="icons">
                            <a> <i className="fas fa-book"></i> {props.num} modules</a>
                            <a> <i className="fas fa-clock"></i> {props.time}</a>
                        </div>
                    </div>
                </div>


        </>
    )
}

export default CourseBox

















