import React, { useState, useEffect,useContext } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios';

import cors1 from '../images/main-course-1.png'
import cors2 from '../images/main-course-2.png'
import cors3 from '../images/main-course-3.png'
import cors4 from '../images/main-course-4.png'
import cors5 from '../images/main-course-5.png'
import cors6 from '../images/main-course-6.png'
import Heading from '../components/Heading';
import CourseBox from '../components/CourseBox';
// import Pagination from '../components/Pagination';
import Pagination from '@mui/material/Pagination';
import Container from "@material-ui/core/Container"; 
import './login.css'
import Search from '../components/Search';
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Courses = () => {
  // let {user, logoutUser} = useContext(AuthContext)
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/all_courses/')
      .then((result) => {
        setdata(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data);


  const [User, setUser] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);

  const [like, setlike ] = useState();

  const [t, i18n] = useTranslation();
  const tdata = data.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'category':item.category,
            'date': item.date,
            'like': item.like,
            'btn': 'معرفة المزيد'
        });
        
    }
  

    return ({
        'id': item.id,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'category':item.category,
        'date': item.date,
        'like': item.like,
        'btn': 'read more'
    });

});

    return (
        <>

          <Header2 />

<Heading title_en="courses" title_ar="الدورات" />

<Search />
{/* { i18n.language === 'en' && <button onClick={() => {
                    i18n.changeLanguage('ar');
                }}>ar</button>}
                { i18n.language === 'ar' && <button onClick={() => {
                    i18n.changeLanguage('en');
                }}>en</button>} */}

    <section className="course-2">


    {tdata ? tdata.map((item) => (
          

          <div className="box">
          <div className="image">
              <img src={item.image} alt="" />
          </div>
          <div className="content">
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.disc}</p>
              
              
              
              {User.authenticated == true ?(<>
                      { item.like.includes(User.id) ? (<><Link to={`/video/${item.id}`}><a className="btn">{item.btn}</a></Link></>)
                      :(<><a href={`/home2/${item.id}`} className="btn">check out!</a></>)}
                    </>):(<><Link to={`/video/${item.id}`}><a className="btn">{item.btn}</a></Link><a href="/home2/" className="btn">check out!</a></>)}




              <div className="icons">
                  <a> <i className="fas fa-book"></i> 12 modules</a>
                  <a> <i className="fas fa-clock"></i> {item.date}</a>
              </div>
          </div>
      </div>
        )) : <p>no post yet!</p>}


        {/* <CourseBox 
            image={cors1} category="business" 
            title="learning is what makes you perfect"
            disc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quam."
            num="12"
            time="6" /> */}


      
 
    </section>
    <Container className='pag'>
            <Pagination count={10} variant="outlined" color="primary" />
        </Container>
        <Footer />
        
        </>
    )
}

export default Courses










