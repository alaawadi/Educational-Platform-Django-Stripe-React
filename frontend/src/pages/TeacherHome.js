import React, { useState, useEffect,useContext } from 'react'

import axios from 'axios';

import { Link } from 'react-router-dom'

import tech1 from '../images/teacher-1.png'
import tech2 from '../images/teacher-2.png'
import tech3 from '../images/teacher-3.png'
import tech4 from '../images/teacher-4.png'
import tech5 from '../images/teacher-5.png'
import tech6 from '../images/teacher-6.png'
import tech7 from '../images/teacher-7.png'
import tech8 from '../images/teacher-8.png'
import Heading from '../components/Heading';
import TechBox from '../components/TechBox';
import Pagination from '@mui/material/Pagination';
import Container from "@material-ui/core/Container"; 
import { useTranslation } from 'react-i18next';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';

const Teacher = () => {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/Profile_page/')
        .then((result) => {
          setdata(result.data);
          setIsLoading(false);
        });
    }, [isLoading]);
    console.log(data);
    

    const [t, i18n] = useTranslation();
    const tdata = data.slice(0,2).map((item) => {
      if(i18n.language === 'ar') {
          
          return ({
              'id': item.id,
              'title': item.title_ar,
              'disc': item.disc_ar,
              'image': item.image,
              'user':item.user
          });
          
      }
      return ({
          'id': item.id,
          'title': item.title_en,
          'disc': item.disc_en,
          'image': item.image,
          'user':item.user
      });
  
  });


    return (
        <>



{/* { i18n.language === 'en' && <button onClick={() => {
                    i18n.changeLanguage('ar');
                }}>ar</button>}
                { i18n.language === 'ar' && <button onClick={() => {
                    i18n.changeLanguage('en');
                }}>en</button>} */}


<section className="teachers">


{tdata ? tdata.map((item) => (
          <div>
              <Link to={`/profile_detail/${item.id}`}>
            <TechBox 
              image={item.image}
              name={item.title}
              work={item.disc} />
</Link>


            </div>
        )) : <p>no post yet!</p>}
        
        
        {/* <TechBox 
            image={tech1}
            name="john deo"
            work="web designer" /> */}



        {/* <TechBox 
            image={tech2}
            name="john deo"
            work="web designer" />


            
        <TechBox 
            image={tech3}
            name="john deo"
            work="web designer" />


            
        <TechBox 
            image={tech4}
            name="john deo"
            work="web designer" />


            
        <TechBox 
            image={tech5}
            name="john deo"
            work="web designer" />



            
        <TechBox 
            image={tech6}
            name="john deo"
            work="web designer" />



            
        <TechBox 
            image={tech7}
            name="john deo"
            work="web designer" />




            
        <TechBox 
            image={tech8}
            name="john deo"
            work="web designer" />




            
        <TechBox 
            image={tech1}
            name="john deo"
            work="web designer" /> */}

   

</section>





        </>
    )
}

export default Teacher



