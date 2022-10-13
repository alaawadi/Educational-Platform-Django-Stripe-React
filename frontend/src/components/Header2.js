import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import AuthContext from '../context/AuthContext'
// import { AppBar, Toolbar } from "@material-ui/core";
import '../App.css'
// import { Container } from '@material-ui/core'
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { deepOrange } from '@mui/material/colors';
const Header2 = (props) => {
    // let {user, logoutUser} = useContext(AuthContext)
 
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

  const [User, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(User);
  





    
    const [t, i18n] = useTranslation();
    const tdata = data.slice(0,2).map((item) => {
      if(i18n.language === 'ar') {
          
          return ({
              // 'image':item.image,
              'title': 'مركز داتا',
              'home':'الرئيسية',
              'services':'الخدمات',
              'pages': 'الصفحات',
              'courses':'الدورات',
              'blogs':'المقالات',
              'projects':'المشاريع',
              'teatchers':'المعلمين',
              'contact':'التواصل',
              'logout':'تسجيل الخروج',
              'signup':'انشاء حساب',
              'login':'تسجيل الدخول'
          });
          
      }
      return ({
          // 'image':item.image,
          'title': 'Data Center',
          'home':'home',
          'services':'services',
          'pages':'pages',
          'courses':'courses',
          'blogs':'blogs',
          'projects':'projects',
          'teatchers':'teatchers',
          'contact':'contact',
          'logout':'logout',
          'signup':'signup',
          'login':'login'
      });
  
  });

    return (
        <>
        
        







{/* // <!-- header section starts  --> */}
{tdata ? tdata.slice(0,2).map((item) => (
<header className="header">

    <Link to="/"><a className="logo"> <i className="fas fa-graduation-cap"></i> {item.title} </a></Link>

    <div id="menu-btn" className="fas fa-bars"></div>
    
    
  
    
    
    <nav className="navbar">
    <ul>
    <Link to='/'><li><a>{item.home}</a></li></Link>
        <Link to='/services'><li><a>{item.services}</a></li></Link>
        <li><a>{item.pages} +</a>
            <ul>
            <li><a><Link to='/courses'>{item.courses}</Link></a></li>
            <li><a><Link to='/projects'>{item.projects}</Link></a></li>
            <li><a><Link to='/blogs'>{item.blogs}</Link></a></li>
            <li><a><Link to='/teacher'>{item.teatchers}</Link></a></li>  
            {/* <li><a></a></li>     */}
    </ul>
        </li>
        
        <Link to='/contact'><li><a>{item.contact}</a></li></Link>
        {User.authenticated === true ? (<li><a href='/logout'>{item.logout} </a></li> ): (<><li><a href='/login'>{item.login}</a></li> <Link to='/signup'><li><a>{item.signup}</a></li></Link> </> )}
            

        {User.authenticated === true && User.is_tech === true ? (<Link to="/profile"><li><a>profile</a></li></Link> ): (<></>)}
        {User.authenticated === true && User.is_tech === false && User.is_student === true ? (<Link to="/student_profile"><li><a>profile</a></li></Link> ): (<></>)}
        
            

            { i18n.language === 'en' && <Link  onClick={() => {
                i18n.changeLanguage('ar');
            }}><li><a>ar</a></li></Link>}
            { i18n.language === 'ar' && <Link onClick={() => {
                i18n.changeLanguage('en');
            }}><li><a>en</a></li></Link>}
       
    </ul>
</nav>
    
</header>
)) : <p>no post yet!</p>}
{/* // <!-- header section ends --> */}

        </>
    )
}

export default Header2



