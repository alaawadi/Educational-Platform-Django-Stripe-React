import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext'
// import axios from 'axios';
import { Grid, Paper, TextField, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
// import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
// import { LOGIN_SUCCESS } from './types';
import './login.css'

import Heading from '../components/Heading';



const Login3 = () => {
    let {loginUser} = useContext(AuthContext)
    const paperStyle = { padding: 20, height: '55vh', width: '65vh', margin: '20px auto' };
    // const avatarStyle = { backgroundColor: '#1bbd7e' };
    // const btnstyle = { margin: '8px', width: '55vh' };
    // LOGIN USER
    // const login = (username, password) => (dispatch) => {
    //   // Headers
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };

    //   // Request Body
    //   const body = JSON.stringify({ username, password });

    //   axios
    //     .post('http://127.0.0.1:5000/api/login', body, config)
    //     .then((res) => {
    //       dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: res.data,
    //       });
    //     });
    // };
    return (
      <>


<Heading title="login" />

        <br /><br /><br />
        <Grid align="center">
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              {/* <Avatar style={avatarStyle}><LockOutlined /></Avatar> */}
              <h2>Login In</h2>
              <br></br>
            </Grid>
            <form class="form1" onSubmit={loginUser}>
                <input className='input1' type="text" name="username" placeholder="Enter Username" />
                <br></br>
                <input className='input1' type="password" name="password" placeholder="Enter Password" />
                <br></br>
                <button class="btn" type="submit">Login</button>
            </form>
            
          </Paper>
        </Grid>
        <br /><br /><br /><br />
      </>
    );
};

export default Login3;



