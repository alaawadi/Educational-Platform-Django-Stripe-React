








import React from 'react'
import { Link } from 'react-router-dom'

const TechBox = (props) => {
    
    return (
        <>

            

        <div className="box">
                <div className="image">
                    <img src={props.image} alt="" />
                    <div className="share">
                        <a className="fab fa-facebook-f"></a>
                        <a className="fab fa-twitter"></a>
                        <a className="fab fa-instagram"></a>
                        <a className="fab fa-linkedin"></a>
                    </div>
                </div>
                <div className="content">
                    <h3>{props.name}</h3>
                    <span>{props.work}</span>
                </div>
            </div>




        </>
    )
}

export default TechBox













