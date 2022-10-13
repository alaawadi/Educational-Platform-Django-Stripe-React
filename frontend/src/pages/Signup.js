// import React, {useContext} from 'react';
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import AuthContext from '../context/AuthContext'
// import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
// import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
// import { LOGIN_SUCCESS } from './types';
import './login.css'

import Heading from '../components/Heading';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../App.css';

const Signup = () => {
    let {signupUser} = useContext(AuthContext)
    const paperStyle = { padding: 20, height: '55vh', width: '65vh', margin: '20px auto' };
    const btnstyle = { margin: '8px', width: '55vh' };
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
              'signup':'تسجيل الدخول'
          });
          
      }
      return ({
          'signup':'signup'
      });
  
  });
    return (
      <>
<Header2 />

<Heading title_en="signup" title_ar="تسجيل الدخول" />

        <br /><br /><br />
        <Grid align="center">
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              {/* <Avatar style={avatarStyle}><LockOutlined /></Avatar> */}
              
              {tdata ? tdata.slice(0,2).map((item) => (
           <h2>{item.signup}</h2>
    )) : <p>no post yet!</p>}

             
              
              <br></br>
            </Grid>
            <form class="form1" onSubmit={signupUser}>
                <input className='input1' type="text" name="username" placeholder="Enter Username" />
                <br></br>
                <input className='input1' type="text" name="email" placeholder="Enter Username" />
                <br></br>
                <input className='input1' type="password" name="password" placeholder="Enter Password" />
                <br></br>
                {tdata ? tdata.slice(0,2).map((item) => (
        <button class="btn" type="submit">{item.signup}</button>
    )) : <p>no post yet!</p>}
                
            </form>
         
          </Paper>
        </Grid>
        <br /><br /><br /><br />
          <Footer />
      </>
    );
};

export default Signup;



