import React, { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './video.css';

import vid1 from '../images/vid-1.mp4'
import vid2 from '../images/vid-2.mp4'
import vid3 from '../images/vid-3.mp4'
import vid4 from '../images/vid-4.mp4'
import vid5 from '../images/vid-5.mp4'
import vid6 from '../images/vid-6.mp4'
// import vid1 from '../images/vid-1.mp4'
import Heading from '../components/Heading';
import { useTranslation } from 'react-i18next';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';
import { useParams } from 'react-router-dom';
const Video = () => {
   const [data, setdata] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { id } = useParams();
   useEffect(() => {
     axios.get('http://127.0.0.1:8000/video_page/')
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
            'video': item.video,
            'course': item.course
            
        });
        
    }
    return ({
        'id': item.id,
        'title': item.title_en,
        'video': item.video,
        'course': item.course
    });

});

useEffect(() => {
   let videoList = document.querySelectorAll('.video-list-container .list');

   videoList.forEach(vid => {
       vid.onclick = () => {
           videoList.forEach(remove => { remove.classList.remove('active') });
           vid.classList.add('active');
           let src = vid.querySelector('.list-video').src;
           let title = vid.querySelector('.list-title').innerHTML;
           let desc = vid.querySelector('.list-desc').innerHTML;
           // let lestitle = vid.querySelector('.title').innerHTML;
           document.querySelector('.main-video-container .main-video').src = src;
           document.querySelector('.main-video-container .main-video').play();
           document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
           document.querySelector('.main-vid-desc').innerHTML = desc;
   
       };
   });
   
   
   
   // let con = document.getElementsByClassName('alaa');
   // con.hide();



// let con = document.getElementsByClassName('alaa');
// con.hide();

})


    return (
        <>

            
<Header2 />

<Heading title_en="lesson" title_ar="الدروس" courses_en="courses" courses_ar="الدورات" />



     
<div class="container">

{tdata ? tdata.slice(0,1).map((item) => (
         
              <div class="main-video-container">
   <video src={item.video} loop controls class="main-video"></video>
   <h3 class="main-vid-title">{item.title}</h3>
</div>

           
        )) : <p>no post yet!</p>}




<div class="video-list-container">



{tdata ? tdata.map((item) => (
      
      <div>
      
              {item.course == id ? (
               
              <div class="list active">
      <video src={item.video} class="list-video"></video>
      <h3 class="list-title">{item.title}</h3>
      <h3 hidden class="list-desc">{item.title}</h3>
   </div>
      
)
: (<input hidden />)}
            </div>
        )) : <p>no post yet!</p>}



   
{/* 
   <div class="list">
      <video src={vid3} class="list-video"></video>
      <h3 class="list-title">zoombie walking animation</h3>
   </div>

   <div class="list">
      <video src={vid4} class="list-video"></video>
      <h3 class="list-title">emoji falling animation</h3>
   </div>

   <div class="list">
      <video src={vid5} class="list-video"></video>
      <h3 class="list-title">3D town animation</h3>
   </div>

   <div class="list">
      <video src={vid6} class="list-video"></video>
      <h3 class="list-title">man chasing carrot animation</h3>
   </div>

   <div class="list">
      <video src={vid1} class="list-video"></video>
      <h3 class="list-title">door hinge animation</h3>
   </div>

   <div class="list">
      <video src={vid5} class="list-video"></video>
      <h3 class="list-title">poeple walking in town animation</h3>
   </div>

   <div class="list">
      <video src={vid4} class="list-video"></video>
      <h3 class="list-title">knight chasing virus animation</h3>
   </div>

   <div class="list">
      <video src={vid2} class="list-video"></video>
      <h3 class="list-title">3D helicopter animation</h3>
   </div> */}

</div>

</div>











<div class="box">
       
   <div class="content">
       <div className='content2'> 
<div className='content3'>
{tdata? tdata.slice(0,1).map((item) => (<>

   <div class="container">
   <h3 class="main-vid-desc">{item.title}</h3>
</div>

</>)):(<></>)}


   </div></div>
   </div>
</div>















          <Footer />

        </>
    )
}

export default Video
