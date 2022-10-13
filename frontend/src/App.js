// import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, useHistory } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import HomePage2 from './pages/HomePage2'

// import LoginPage from './pages/LoginPage'

import LoginPage2 from './pages/LoginPage2'
import Login3 from './pages/Login3'

import Header from './components/Header'

import About from './pages/About'
import Courses from './pages/Courses';

import Services from './pages/Services';

import Blogs from './pages/Blogs';
import Projects from './pages/Projects';
import Teacher from './pages/Teacher';
import Contact from './pages/Contact';
import Video from './pages/Video';

import Signup from './pages/Signup';

import CreateCourse from './pages/CreateCourse';
import Profile from './pages/Profile';
import Profile_detail from './pages/Profile_detail';
import Student_Profile from './pages/Student_Profile';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2';
import Dashboard3 from './pages/Dashboard3';
import Dashboard4 from './pages/Dashboard4';
import Dashboard5 from './pages/Dashboard5';
import Profiledash from './pages/Profiledash';


import UpdateStudent from './pages/UpdateStudent';
import UpdateCourse from './pages/UpdateCourse';
import UpdateCourseT from './pages/UpdateCourseT';

import UpdateBlog from './pages/UpdateBlog';
import UpdateBlog2 from './pages/UpdateBlog2';


// import UpdateHome from './pages/UpdateHome';
import UpdateHome from './pages/UpdateHome';

import UpdateProfile from './pages/UpdateProfile';

import UpdateStudentProfile from './pages/UpdateStudentProfile';

import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import ServDetail from './pages/ServDetail';


import UpdateBlogT from './pages/UpdateBlogT';

import CreateProject from './pages/CreateProject';
import CreateServices from './pages/CreateServices';
import CreateBlog from './pages/CreateBlog';
import CreateBlog2 from './pages/CreateBlog2';

import axios from 'axios';
// import il8n from 'il8next';
function App() {
  let history = useHistory();
  const [User, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth')
      .then((result) => {
        setUser(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(User);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/')
      .then((result) => {
        setUsers(result.data);
        setIsLoading(false);
      });
  }, [isLoading]);
  console.log(Users);

  







  return (
    <div className="App">

      <Router>
        <AuthProvider>
          <Route component={Profile_detail} path='/profile_detail/:id' exact />
          <Route component={Profile} path='/profile' exact />
          <Route component={Student_Profile} path='/student_profile' exact />
          <Route component={HomePage2} path="/" exact />
          <Route component={Services} path="/services" exact />
          {/* <Route component={LoginPage} path="/login"/> */}
          

          <Route component={Profiledash} path='/Profiledash' exact />

          <Route component={CreateBlog2} path="/CreateBlog2"/>

          <Route component={Dashboard} path="/dashboard"/>
          <Route component={Dashboard2} path="/dashboard2"/>
          <Route component={Dashboard3} path="/dashboard3"/>
          <Route component={Dashboard4} path="/dashboard4"/>
          <Route component={Dashboard5} path="/dashboard5"/>

          {/* <Route component={Login3} path="/login3"/> */}
          <Route component={HomePage} path="/home2" />
          <Route component={About} path="/about" />
          <Route component={Courses} path="/courses" />
          <Route component={Blogs} path="/blogs" />
          <Route component={Projects} path="/projects" />
          <Route component={Teacher} path="/teacher" />
          <Route component={Contact} path="/contact" />
          <Route component={Video} path="/video/:id" />
          <Route component={Signup} path="/signup" />


          <Route component={CreateCourse} path="/createcourse" />
          
          <Route component={CreateProject} path="/createproject" histoy={history} />
          <Route component={CreateServices} path="/createservices" />
          <Route component={CreateBlog} path="/createblog" User={User} />


          <Route component={BlogDetail} path="/blogdetail/:id" />
          <Route component={ProjectDetail} path="/projectdetail/:id" />
          <Route component={ServDetail} path="/servdetail/:id" />


          <Route component={UpdateStudent} path="/updatestudent/:id" />
          <Route component={UpdateCourse} path="/updatecourse/:id" />
          <Route component={UpdateCourseT} path="/updatecourset/:id" />
          <Route component={UpdateBlog} path="/updateblog/:id" />
          <Route component={UpdateBlog2} path="/UpdateBlog2/:id" />


          <Route component={UpdateHome} path="/updatehome/:id" />
          <Route component={UpdateProfile} path="/updateprofile/:id" />
          <Route component={UpdateStudentProfile} path="/UpdateStudentProfile/:id" />

          <Route component={UpdateBlogT} path="/updateblogt/:id" />

          
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
