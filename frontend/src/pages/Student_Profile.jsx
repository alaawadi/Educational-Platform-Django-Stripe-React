import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './profile1.css'
import '../App.css'
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import tech1 from '../images/teacher-1.png'
import { useTranslation } from 'react-i18next';


const Student_Profile = () => {
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
    const tdata = data.map((item) => {
      if(i18n.language === 'ar') {
          
          return ({
              'id': item.id,
              'user':item.user,
              'title': item.title_ar,
              'disc': item.disc_ar,
              'image': item.image,
              'btn': 'المزيد'
          });
          
      }
      return ({
          'id': item.id,
          'user':item.user,
          'title': item.title_en,
          'disc': item.disc_en,
          'image': item.image,
          'btn': 'about me'
      });
  
  });



  const [data2, setdata2] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/services/')
      .then((result) => {
        setdata2(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data2);
  
  const tdata2 = data2.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'user':item.user,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'btn': 'معرفة المزيد'
            
        });
        
    }
    return ({
        'id': item.id,
        'user':item.user,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'btn': 'read more'
    });

});



const [data3, setdata3] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Blog_list/')
      .then((result) => {
        setdata3(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data3);
//   console.log(props.User.id);
  const tdata3 = data3.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'user':item.user,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'like': item.like,
            'btn': 'معرفة المزيد'
            
        });
        
    }
    return ({
        'id': item.id,
        'user':item.user,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'like': item.like,
        'btn': 'read more'
    });

});







const [datapro, setdatapro] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Project_list/')
      .then((result) => {
        setdatapro(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data3);
//   console.log(props.User.id);
  const tdatapro = datapro.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'user':item.user,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'like': item.like,
            'btn': 'معرفة المزيد'
            
        });
        
    }
    return ({
        'id': item.id,
        'user':item.user,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'like': item.like,
        'btn': 'read more'
    });

});





const [data4, setdata4] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/all_courses/')
      .then((result) => {
        setdata4(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data3);
  
  const tdata4 = data4.map((item) => {
    if(i18n.language === 'ar') {
        
        return ({
            'id': item.id,
            'title': item.title_ar,
            'disc': item.disc_ar,
            'image': item.image,
            'like': item.like,
            'user': item.user,
            'btn': 'معرفة المزيد'
            
        });
        
    }
    return ({
        'id': item.id,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'like': item.like,
        'user': item.user,
        'btn': 'read more'
    });

});



const [User, setUser] = useState([]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(User);




    return (
        <>






<Header2 />



<br></br><br></br><br></br><br></br>

{/* <h1>{data.title_ar}</h1> */}


{/* <!-- header section starts  --> */}


{tdata ? tdata.map((item) => (
          <div>
            
            
            
{User.id == item.user ? (
        <section className="home2" id="home2">

        <div className="image2">
            
            
            
            <img src={item.image} alt="" />
        
        </div>
        <div className="content2">
            
            
            <h3><span>{item.title}</span> </h3>
            
        
            
        <p>{item.disc} </p>
        
        
        
            <a href="" className="btn">{item.btn}</a>
            <Link to={`/UpdateStudentProfile/${item.id}`} className='fas fa-edit ed'></Link>
        
        </div>
        
        </section>

)
            : (<input hidden />)}
            
          </div>
        )) : <p>no post yet!</p>}



               
 
            


 
        




{/* <!-- service section starts  --> */}




{/* 

<section className="services2" id="services2">

    <h1 className="heading2"> <span>my</span> services </h1>
    
    <div className="box-container2">

    
      
{tdata2 ? tdata2.map((item) => (
            <Link >
            {item.like.includes(User.id) ? (
        
        <div className="box2">
                
        <img src={item.image}  />
        
        <h3>{item.title}</h3>
        <p>{item.disc}</p>
        
        
    </div>

        )
                    : (<input hidden />)}
            
        </Link>
        )) : <p>no post yet!</p>}

  
    </div>


</section> */}









{/* <!-- portfolio section starts  --> */}





<section className="portfolio2" id="portfolio2">

    <h1 className="heading2"> <span>favorite</span> projects </h1>
    
    <div className="button-container2">

        <div className="btn">title</div>
        <div className="btn">title</div>
        <div className="btn">title</div>
        <div className="btn">title</div>
        <div className="btn">title</div>
        <div className="btn">title</div>
        <div className="btn">title</div>

        
    </div>
    <div className="image-container2">


    {tdatapro ? tdatapro.map((item) => (
            
<Link to={`/blogdetail/${item.id}`}>
{item.like.includes(User.id) ? (
        
        <div className="box2">
            
            <img src={item.image} />
            
            
            <div className="info2">
                <h3>{item.title}</h3>
            
            </div>
        
        </div>
        
        )
                    : (<input hidden />)}
        
    </Link>

        )) : <p>no post yet!</p>}

        
        
    </div>

    

</section>












{/* <!-- portfolio section ends --> */}

{/* <!-- blog section start  --> */}






















<section className="blog2" id="blog2">

    <h1 className="heading2"> <span>favorite</span> blogs </h1>
    <div className="box-container2">
    {tdata3 ? tdata3.map((item) => (

<div>
        {item.like.includes(User.id) ? (
            <Link to={`/blogdetail/${item.id}`}>
            <div className="box2">
                    <img src={item.image} alt="" />
                    <div className="content2">
                        <h3 className="info2"> <i className="fas fa-user"></i> by: {item.user} <i className="fas fa-calendar"></i> date </h3>
                        <a className="title2"> {item.title} </a>
                        <p>{item.disc}</p>
                        <a className="btn">{item.btn}</a>
                    </div>
                </div>
            </Link>
        ): (<input hidden />)}

</div>
        )) : <p>no post yet!</p>}



       
    </div>





</section>






<section className="blog2" id="blog2">

    <h1 className="heading2"> <span>favorite</span> Courses </h1>
    <div className="box-container2">

    {tdata4 ? tdata4.map((item) => (
        <div>

{item.like.includes(User.id) ? (
    
<div className="box2">
            <img src={item.image} alt="" />
            <div className="content2">
                <h3 className="info2"> <i className="fas fa-user"></i> by: {item.user} <i className="fas fa-calendar"></i> date </h3>
                <a className="title2">{item.title}  </a>
                <p>{item.disc}</p>
                <Link to={`/video/${item.id}`} className="btn">{item.btn}</Link>
            </div>
        </div>
        
        ): (<input hidden />)}
        </div>
        )) : <p>no post yet!</p>}

        

       
    </div>





</section>

<Footer />





{/* <!-- blog section ends --> */}











{/* <!-- blog section start  --> */}
{/* 
<section className="blog" id="blog">

    <h1 className="heading"> <span>my</span> courses </h1>
    <div className="box-container">
        <div className="box">
            <img src="" alt="" />
            <div className="content">
                <h3 className="info"> <i className="fas fa-user"></i> by: user <i className="fas fa-calendar"></i> date </h3>
                <a href="#" className="title"> title </a>
                <p>desciption</p>
                <a href="" className="btn">read more</a>
                
                
            </div>
        </div>
        
       
    </div>



</section> */}

{/* <!-- blog section ends --> */}

















{/* <!-- contact section starts  --> */}
{/* 
<section className="contact" id="contact">

    <h1 className="heading"> contact <span>me</span> </h1>
    <div className="box-container">
        <div className="box">
            <i className="fas fa-phone"></i>
            <h3>my number</h3>
            <p>phone</p>
        </div>

        <div className="box">
            <i className="fas fa-envelope"></i>
            <h3>my email</h3>
            <p>email</p>
        </div>

        <div className="box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>my address</h3>
            <p>address</p>
        </div>

    </div>

    <div className="row">

        <form method="POST">

            <div className="inputBox">
                <input type="email" placeholder="email"  name="email" />
            </div>
            <input type="text" placeholder="subject"  name="subject" />
            <textarea cols="30" rows="10" placeholder="message"  name="message"></textarea>
            <button className="btn"> send message </button>
        </form>

        <iframe className="map" src="" allowfullscreen="" loading="lazy"></iframe>

    </div>

    

</section> */}


{/* <!-- contact section ends -->

<!-- footer section  --> */}

{/* <div className="footer">created by <span><a href=""> Alaa Wadi </a></span> | all rights reserved!</div>


 */}













</>
    )
}

export default Student_Profile





