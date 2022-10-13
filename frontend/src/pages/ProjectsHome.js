import React, { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


import blog1 from '../images/blog-1.jpg'
import blog2 from '../images/blog-2.jpg'
import blog3 from '../images/blog-3.jpg'
import blog4 from '../images/blog-4.jpg'
import blog5 from '../images/blog-5.jpg'
import blog6 from '../images/blog-6.jpg'
import blog7 from '../images/blog-7.jpg'
import blog8 from '../images/blog-8.jpg'
import Heading from '../components/Heading';
import BlogBox from '../components/BlogBox';
import Pagination from '@mui/material/Pagination';
import Container from "@material-ui/core/Container"; 
import { useTranslation } from 'react-i18next';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Projects = () => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(User);

  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Project_list/')
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
            'created_at':item.created_at,
            'user': item.user,
            'content': item.content,
            'like': item.like,
            'btn': 'معرفة المزيد'
          });
        
    }
    return ({
        'id': item.id,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'created_at':item.created_at,
        'user': item.user,
        'content': item.content,
        'like': item.like,
        'btn': 'read more'
    });

});

  const [like, setlike ] = useState();

  
  
  
    return (
        <>

        {/* { i18n.language === 'en' && <button onClick={() => {
                    i18n.changeLanguage('ar');
                }}>ar</button>}
                { i18n.language === 'ar' && <button onClick={() => {
                    i18n.changeLanguage('en');
                }}>en</button>} */}

<section className="blog">



{tdata ? tdata.map((item) => (
          <div>
              
              <div className="box">
                <div className="image">
                    <img src={item.image} alt="" />
                </div>
                <div className="content">
                    <div className="icons">
                        <a href="#"> <i className="fas fa-clock"></i>{item.time}</a>
                        <a href="#"> <i className="fas fa-user"></i>by {item.user}</a>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.disc}</p>
                     {/* <div>{item.content}</div>  */}
                     {/* <div>{item.like}</div>  */}
                    
                     <Link className="btn" to={`/projectdetail/${item.id}`}>more</Link>
                    {User.authenticated ==true ?(<>
                      { item.like.includes(User.id) ? (<Button onClick={() => {

axios.get(`http://127.0.0.1:8000/like_dislike/${item.id}`)
  .then((result) => {
    setlike(result.data);
    setIsLoading(false);
  });
}}> <FavoriteIcon /></Button>):(<Button onClick={() => {

    axios.get(`http://127.0.0.1:8000/like_dislike/${item.id}`)
      .then((result) => {
        setlike(result.data);
        setIsLoading(false);
      });
  
}}><FavoriteBorderIcon /></Button>)}
                    </>):(<></>)}
                </div>
            </div>


            </div>
        )) : <p>no post yet!</p>}


        
        {/* <BlogBox 
            image={blog1} category="business" 
            time="21st may, 2021"
            user="admin"
            title="learning is what makes you perfect"
            disc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, quaerat!" /> */}


      

</section>



        </>
    )
}

export default Projects













