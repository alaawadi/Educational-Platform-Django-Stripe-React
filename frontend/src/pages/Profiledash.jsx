import React from 'react';
import { Grid, Paper, TextField, Button, IconButton, Input } from '@material-ui/core';
import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PhotoCamera } from '@material-ui/icons';

const Profiledash = () => {
    const paperStyle = { padding: 20, height: '85vh', width: '65vh', margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#f56a00',size:'10rem' };
    const btnstyle = { margin: '8px', width: '55vh' };
    const inp = { display: 'none' };
    return (
      <>
        <br /><br /><br />
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <br /><br />
            <Grid align="center">
              <Avatar style={avatarStyle} size={120}>A</Avatar>
              <br />
              <Input accept="image/*" id="icon-button-file" type="file" style={inp} />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </Grid>
            <TextField label="Username" placeholder="Enter Username" fullWidth required />
            <TextField label="Email" placeholder="Enter Email" fullWidth required />
            <TextField label="Telegram Username" placeholder="Enter Telegram Username" fullWidth required />
            <Link to="/ChangePassword">
              <Button color="primary" variant="outlined" style={btnstyle} fullWidth>Change Password</Button>
            </Link>
            <Link to="/ResetPassword">
              <Button color="primary" variant="outlined" style={btnstyle} fullWidth>Reset Password</Button>
            </Link>
            <br /><br />
            <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>Save</Button>
            <br /><br />
          </Paper>
        </Grid>
        <br /><br />
      </>
    );
};

export default Profiledash;
