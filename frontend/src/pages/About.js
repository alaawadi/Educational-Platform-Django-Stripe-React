import React from 'react'
// import './home.css'
import about_img from '../images/about-img.png'

const About = () => {
    
    return (
        <>

            <section className="about">

                <div className="image">
                    <img src={about_img} alt="" />
                </div>

                <div className="content">
                    <h3>I will stay with you until you pass your exam.</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ducimus at maiores repellat aut debitis aliquam esse, quisquam nobis laborum velit voluptate excepturi obcaecati dignissimos omnis. Fugiat hic quod nobis?</p>
                    <a href="#" className="btn">learn more</a>
                </div>

            </section>

        </>
    )
}

export default About






