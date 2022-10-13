import React, { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import serv1 from '../images/course-1.png'
import serv2 from '../images/course-2.png'
import serv3 from '../images/course-3.png'
import serv4 from '../images/course-4.png'
import serv5 from '../images/course-5.png'
import serv6 from '../images/course-6.png'
import serv7 from '../images/course-7.png'
import serv8 from '../images/course-8.png'
import serv9 from '../images/course-9.png'
import Heading from '../components/Heading';

import ServBox from '../components/ServBox';
import Pagination from '@mui/material/Pagination';
import Container from "@material-ui/core/Container"; 
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';

const Services = () => {
    
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Serv_list/')
      .then((result) => {
        setdata(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data);
  
  const [t, i18n] = useTranslation();
  const tdata = data.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'btn': 'معرفة المزيد'
            
        });
        
    }
    return ({
        'id': item.id,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'btn': 'read more'
    });

});

    return (
        <>






<section className="course-1">



{tdata ? tdata.map((item) => (
          <div>
              
              <ServBox image={item.image} title={item.title} 
             disc={item.disc} btn={item.btn} id={item.id} />

            </div>
        )) : <p>no post yet!</p>}
{/* 
    <ServBox image={serv1} title="web design" 
             disc="Lorem ipsum, dolor sit amet consectetur
             adipisicing elit. Cumque, earum." />

    */}


</section>



        </>
    )
}

export default Services



