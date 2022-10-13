import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './dashboard.css';
import DashNav from '../components/DashNav';
import tech5 from '../images/teacher-5.png'
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

const CreateProject = () => {
    
    let history = useHistory();
  
    const [User, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState([]);
    
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/auth')
        .then((result) => {
          setUser(result.data);
          setIsLoading(false);
        });
    }, [isLoading]);
    console.log(User);
  
    let PostItem = async (e )=> {
      e.preventDefault()
      let formField = new FormData()

      formField.append('title_ar', e.target.title_ar.value);
      formField.append('title_en', e.target.title_en.value);
      formField.append('disc_ar', e.target.disc_ar.value);
      formField.append('disc_en', e.target.disc_en.value);
      formField.append('image', e.target.image.files[0]);
      formField.append('user', User.id);

      let response = await fetch('http://127.0.0.1:8000/create_list/', {
          method:'POST',
          body:formField
      },[setIsLoading(false)])
  

      if(response.status === 201){
        alert('Created sucssesfuly!')
        history.push('/profile')  
      }else{
        alert('something error!')
          // window.location.reload()
      }
  }


    return (
      <>
<Header2 />
<div class="container5">
  
        
            <section class="main">
       

       <br></br>
       <br></br>
       <br></br>
        <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Create Project</h2>
    

    {/* <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div> */}
<form class="form1" onSubmit={PostItem}>
      <div className="form-group">
      <label for="title_ar">title ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Name"
          name="title_ar"
        />
      </div>
     
      <div className="form-group">
      <label for="title_en">Title en</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your E-mail Address"
          name="title_en"
        />
      </div>
      <div className="form-group">
      <label for="disc_ar">Disc ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Phone Number"
          name="disc_ar"
        />
      </div>


      <div className="form-group">
      <label for="disc_en">Disc en</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Phone Number"
          name="disc_en"
        />
      </div>


      
      <div className="form-group">
      <label for="image">Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>


      


      <button type='submit' className="btn btn-primary btn-block">Create</button>
      </form>
  </div>
</div>
</section>
  </div>
 <Footer />
 </>
    );
};

export default CreateProject;