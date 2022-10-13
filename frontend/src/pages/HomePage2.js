import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './home.css'
import home from '../images/1.png'
import cat1 from '../images/category-1.png'
import cat2 from '../images/category-2.png'
import cat3 from '../images/category-3.png'
import cat4 from '../images/category-4.png'
import cat5 from '../images/category-5.png'
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';
import seticon from '../images/set.png'
import './dashboard.css';
import About from './About';
import ServicesHome from './ServicesHome';
import CoursesHome from './CoursesHome';
import ProjectsHome from './ProjectsHome';
import BlogsHome from './BlogsHome';

const HomePage2 = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/home/')
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
            'btn': 'ابدأ الآن'
        });
        
    }
    return ({
        'id': item.id,
        'title': item.title_en,
        'disc': item.disc_en,
        'image': item.image,
        'btn': 'get started'
    });

});

console.log(tdata)

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
        <Header2></Header2>
          <div>
            {User.is_admin == true? (<Link to='/dashboard'><img className='set' src={seticon} /></Link>):(<div hidden></div>)}

          {/* { i18n.language === 'en' && <button onClick={() => {
                    i18n.changeLanguage('ar');
                }}>ar</button>}
                { i18n.language === 'ar' && <button onClick={() => {
                    i18n.changeLanguage('en');
                }}>en</button>} */}



            {tdata ? tdata.slice(0,2).map((item) => (
          
              <section className="home">
        
              <div className="image">
                    <img src={item.image} alt="" />
                </div>

                <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.disc}</p>
                    <Link to='/services' className="btn">{item.btn}</Link>
                </div>
                {User.is_admin == true? (<Link to={`/updatehome/${item.id}`} className='fas fa-edit ed'></Link>):(<div hidden></div>)}
                

            </section>
        )) : <p>no post yet!</p>}


</div>
<br></br>

<h1 className="heading2"> <span>About</span> Acadimy </h1>
<About></About>

<br></br>

<h1 className="heading2"> <span>Our</span> services </h1>
<ServicesHome></ServicesHome>

<br></br>

<h1 className="heading2"> <span>Our</span> Courses </h1>
<CoursesHome></CoursesHome>

<br></br>

<h1 className="heading2"> <span>Our</span> Projects </h1>
<ProjectsHome></ProjectsHome>

<br></br>

<h1 className="heading2"> <span>Our</span> Blogs </h1>
<BlogsHome></BlogsHome>

<br></br>
          <Footer />


</>
    )
}

export default HomePage2
