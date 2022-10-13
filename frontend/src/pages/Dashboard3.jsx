

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
// import './home.css'
import about_img from '../images/about-img.png'
import './dashboard.css';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import DashNav from '../components/DashNav';
// import '../App.css';
const Dashboard3 = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setdata2] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/blog_count/')
      .then((result) => {
        setdata2(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data2);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Blog_list/')
      .then((result) => {
        setdata(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(data);
    return (

        

<>
  <div class="container5">
    
<DashNav />

    <section class="main">
    {/* <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} /> */}
    {/* <div>{data.x}</div> */}
      <div class="main-top">
        <h1>Blogs</h1>
        
      </div>
      <div class="users2">
        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>All Blogs</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{data.length}+</span>
              
              
          </div>
        </div>


        <div class="card">
          <img src={about_img} />
          <br></br>
          <h4>All Likes</h4>
          <div class="per">
            <br></br>
            
                <span className='span' align-self="center">{data2.all}+</span>
              
              
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
          <h1>Blogs List</h1>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Discripton</th>
                <th>created at</th>
                <th>detail</th>
              </tr>
            </thead>
            <tbody>
            {data ? data.map((item) => (
                <tr>
                <td>{item.id}</td>
                <td>{item.title_en}</td>
                <td>{item.disc_en.slice(0,10)} ...</td>
                <td>{item.created_at.slice(6,10)}</td>
                <td>
                <i className='fa fa-trash del' onClick={async () => {
    await axios.delete(`http://127.0.0.1:8000/delBlog/${item.id}`);
     }}></i>
                  <Link className='fas fa-edit ed' to={`/updateblog/${item.id}`} ></Link></td>
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

export default Dashboard3





