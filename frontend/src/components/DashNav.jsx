



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import about_img from '../images/about-img.png'
import axios from 'axios';

const DashNav = (props) => {
  const [User, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(User);



  
const [blog, setBlog] = useState({});

useEffect(() => {
    // const slug = props.match.params.id;

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/ProfileDetailView/${User.id}`);
            setBlog(res.data);
        }
        catch (err) {

        }
    };

    fetchData();
}, [isLoading]);



    return (
        <>

            

         
<nav className='nav2'>
      <ul>
        <li><Link className='a' to="/" class="logo2">
          <img src={blog.image} />
          <span class="nav-item2">{User.username}</span>
        </Link></li>
        <li><Link to="/dashboard" className='a'>
          <i class="fas fa-menorah"></i>
          <span class="nav-item2">Users</span>
        </Link></li>
        <li><Link to="/dashboard2" className='a'>
          <i class="fas fa-comment"></i>
          <span class="nav-item2">Services</span>
        </Link></li>
        <li><Link to="/dashboard5" className='a'>
          <i class="fas fa-cog"></i>
          <span class="nav-item2">Courses</span>
        </Link></li>
        <li><Link to="/dashboard4" className='a'>
          <i class="fas fa-chart-bar"></i>
          <span class="nav-item2">Projects</span>
        </Link></li>
        <li><Link to="/dashboard3" className='a'>
          <i class="fas fa-database"></i>
          <span class="nav-item2">Blogs</span>
        </Link></li>
        
        

        <li><a className='a' class="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span class="nav-item2">Log out</span>
        </a></li>
      </ul>
    </nav>


        </>
    )
}

export default DashNav





















