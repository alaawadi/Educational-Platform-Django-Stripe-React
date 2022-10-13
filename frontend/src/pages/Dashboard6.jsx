

// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios';
// // import './home.css'
// import about_img from '../images/about-img.png'
// import './dashboard.css';
// import Header2 from '../components/Header2';
// import Footer from '../components/Footer';
// import DashNav from '../components/DashNav';
// import { Button } from 'antd';

// // import '../App.css';
// const Dashboard6 = () => {
//   const [data, setdata] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [data2, setdata2] = useState([]);



//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/home/')
//       .then((result) => {
//         setdata(result.data);
//         setIsLoading(false);
//       });
//   }, [isLoading]);
//   console.log(data);




//     return (

        

// <>
//   <div class="container5">
    
// <DashNav />

//     <section class="main">
//     {/* <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} /> */}
//     {/* <div>{data.x}</div> */}
//       <div class="main-top">
//         <h1>home</h1>
        
//       </div>
//       <div class="users2">
        

//         <div class="card">
//           <img src={data.image} />
//           <br></br>
//           <h4>Home</h4>
//           <div class="per">
//             <br></br>
            
//                 <span className='span' align-self="center">{data.title_en}+</span>
              
              
//           </div>
//         </div>


     
//       </div>

//       <section class="attendance">
//         <div class="attendance-list">
//           <h1>Courses List</h1>
//           <table class="table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Discripton</th>
//                 <th>Created at</th>
//                 <th>User</th>
//                 <th>Category</th>
//                 <th>Detail</th>
//               </tr>
//             </thead>
//             <tbody>
//             {data ? data.map((item) => (
//                 <tr>
//                 <td>{item.id}</td>
//                 <td>{item.title_en}</td>
//                 <td>{item.disc_en.slice(0,10)} ...</td>
//                 <td>{item.date.slice(6,10)}</td>
//                 <td>{item.user}</td>
//                 <td>{item.category}</td>
//                 <td>
//                 <i className='fa fa-trash del' onClick={async () => {
//     await axios.delete(`http://127.0.0.1:8000/delCourse/${item.id}`);
//      }}></i>
//                   <Link className='fas fa-edit ed' to={`/updatecourse/${item.id}`} ></Link></td>
//               </tr>
//                 )) : <p>no users yet!</p>}
                
// {/*              
//               <tr>
//                 <td>04</td>
//                 <td>Sara David</td>
//                 <td>Design</td>
//                 <td>03-24-22</td>
//                 <td>8:00AM</td>
//                 <td>3:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//               */}
//             </tbody>
//           </table>
//         </div>
//       </section>








//     </section>
//   </div>
// <Footer />
// </>
       
//     )
// }

// export default Dashboard6





