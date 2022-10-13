import React, { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


import Heading from '../components/Heading';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';

const Contact = () => {
    
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Contact_page/')
      .then((result) => {
        setdata(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data);
    return (
        <>
   
          <Header2 />
   <Heading title_en="contact" title_ar="التواصل" />


        <section class="contact">

        {data ? data.slice(0,2).map((item) => (
              
            <div class="icons-container">

            <div class="icons">
                <i class="fas fa-phone"></i>
                <h3>our number</h3>
                <p>{item.phone}</p>
                <p>{item.phone}</p>
            </div>

            <div class="icons">
                <i class="fas fa-envelope"></i>
                <h3>our email</h3>
                <p>{item.email}</p>
                <p>{item.email}</p>
            </div>

            <div class="icons">
                <i class="fas fa-map-marker-alt"></i>
                <h3>our address</h3>
                <p>{item.address_ar}</p>
                <p>{item.address_en}</p>
            </div>

        </div>

        )) : <p>no post yet!</p>}

            

            <div class="row">

                <form action="">
                    <h3>get in touch</h3>
                    <input type="text" placeholder="your name" class="box" />
                    <input type="number" placeholder="your number" class="box" />
                    <input type="email" placeholder="your email" class="box" />
                    <textarea placeholder="your message" cols="30" rows="10"></textarea>
                    <input type="submit" value="send message" class="btn" />
                </form>
        
        
        {data ? data.slice(0,1).map((item) => (
             
            <iframe class="map" src={item.map} allowfullscreen="" loading="lazy"></iframe>


        
        )) : <p>no post yet!</p>}

            </div>

          
            </section> 
            <Footer />

           </>
    )
}

export default Contact

