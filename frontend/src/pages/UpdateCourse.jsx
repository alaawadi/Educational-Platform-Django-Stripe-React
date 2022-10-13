import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './dashboard.css';
import DashNav from '../components/DashNav';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

const UpdateCourse = () => {

    let history = useHistory();
    const { id } = useParams();

    // const [image, setImage] = useState(null)
    const [title_ar, setTitle_ar] = useState(null)
    const [title_en, setTitle_en] = useState(null)
    const [disc_ar, setDisc_ar] = useState(null)
    const [disc_en, setDisc_en] = useState(null)
    const [image, setImage] = useState(null)
    const [data, setdata] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/showSingleCourse/${id}`);
    console.log(result.data.username);

    // setImage(result.data.image);
    setTitle_ar(result.data.title_ar);
    setTitle_en(result.data.title_en);
    setDisc_ar(result.data.disc_ar);
    setDisc_en(result.data.disc_en);
    setImage(result.data.image)
    setdata(result.data)
    
    // setis_student(result.data.is_admin);
   }



   const updateSingleStudent = async (e) => {
    e.preventDefault()
    let formField = new FormData()

    formField.append('title_ar', title_ar);
    formField.append('title_en', title_en);
    formField.append('disc_ar', disc_ar);
    formField.append('disc_en', disc_en);
    formField.append('image', image);
    formField.append('user', data.user);
        
        // if(image !== null) {
        //   formField.append('image', image)
      
        // }

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/upCourse/${id}`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/dashboard5");
        })

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
    <h2 className="text-center mb-4">Update Course</h2>
    

    {/* <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div> */}


      
<div className="form-group">
      <label for="title_en">Image</label>
        <img src={image} />
      </div>

      <div className="form-group">
      <label for="title_en">Title en</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Name"
          name="title_en"
          value={title_en}
          onChange={(e) => setTitle_en(e.target.value)}
        />
      </div>
     
      <div className="form-group">
      <label for="title_ar">Title ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your E-mail Address"
          name="title_ar"
          value={title_ar}
          onChange={(e) => setTitle_ar(e.target.value)}
        />
      </div>
      <div className="form-group">
      <label for="disc_en">Disc en</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Phone Number"
          name="disc_en"
          value={disc_en}
          onChange={(e) => setDisc_en(e.target.value)}
        />
      </div>


      <div className="form-group">
      <label for="disc_ar">Disc ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your address Name"
          name="disc_ar"
          value={disc_ar}
          onChange={(e) => setDisc_ar(e.target.value)}
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

      <button onClick={updateSingleStudent} className="btn btn-primary btn-block">Update</button>
   
  </div>
</div>
</section>
  </div>
  <Footer />
  </>
 
    );
};

export default UpdateCourse;