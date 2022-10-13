

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
// import './home.css'
import about_img from '../images/about-img.png'
import './dashboard.css';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import DashNav from '../components/DashNav';
// import RunChart from '../components/RunChart';

// import { BarChart } from '@material-ui/icons';
// import '../App.css';
const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/use/')
      .then((result) => {
        setdata(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data);

//   const createBlog = () => {
//     return {__html: data.x}
// };
    
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/')
      .then((result) => {
        setUsers(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(Users);
    return (

        

<>


  <div class="container5">
  
<DashNav />

    <section class="main">
      
    {/* <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} /> */}
    {/* <div>{data.x}</div> */}
      <div class="main-top">
        <h1>Users</h1>
      </div>
      <div class="users">
        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>All Users</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{Users.length}+</span>
              
              
          </div>
        </div>


        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>Last 3 month</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{data.x3}+</span>
              
              
          </div>
        </div>


        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>Last 6 month</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{data.x6}+</span>
              
              
          </div>
        </div>



        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>Last 1 year</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{data.x12}+</span>
              
              
          </div>
        </div>

        {/* <div class="card">
          <img src={about_img} />
          <h4>Salina micheal</h4>
          <p>Ui designer</p>
          <div class="per">
            <table>
              <tr>
                <td><span>85%</span></td>
                <td><span>82%</span></td>
              </tr>
              <tr>
                <td>Month</td>
                <td>Year</td>
              </tr>
            </table>
          </div>
          <button>Profile</button>
        </div> */}
      </div>

      <section class="attendance">
        <div class="attendance-list">
          <h1>Users List</h1>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Join date</th>
                <th>last login</th>
                <th>type</th>
                <th>detail</th>
              </tr>
            </thead>
            <tbody>
            {Users ? Users.map((item) => (
                <tr>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.date_joined.slice(6,10)}</td>
                <td>{item.last_login.slice(6,10)}</td>
                {item.is_tech == true?(<td>Teacher</td>):(<td>Student</td>)}
                <td>
                <i className='fa fa-trash del' onClick={async () => {
    await axios.delete(`http://127.0.0.1:8000/deleteProduct/${item.id}`);
     }}></i>
                  <Link className='fas fa-edit ed' to={`/updatestudent/${item.id}`} ></Link></td>

              </tr>
                )) : <p>no users yet!</p>}
                
{/*              
              <tr>
                <td>04</td>
                <td>Sara David</td>
                <td>Design</td>
                <td>03-24-22</td>
                <td>8:00AM</td>
                <td>3:00PM</td>
                <td><button>View</button></td>
              </tr>
              */}
            </tbody>
          </table>
        </div>
      </section>








    </section>
  </div>

</>
       
    )
}

export default Dashboard





