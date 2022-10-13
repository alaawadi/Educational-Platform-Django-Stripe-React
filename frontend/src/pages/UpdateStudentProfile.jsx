import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './dashboard.css';
import DashNav from '../components/DashNav';
import tech5 from '../images/teacher-5.png'

const UpdateStudentProfile = () => {

    let history = useHistory();
    const { id } = useParams();

    // const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [is_tech, setis_tech] = useState(null)
    const [is_student, setis_student] = useState(null)
    const [data, setdata] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [title_ar, setTitle_ar] = useState(null)
    const [title_en, setTitle_en] = useState(null)
    const [disc_ar, setDisc_ar] = useState(null)
    const [disc_en, setDisc_en] = useState(null)
    const [image, setImage] = useState(null)
    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/profilex/${id}`);
    console.log(result.data);

    setTitle_ar(result.data.title_ar);
    setTitle_en(result.data.title_en);
    setDisc_ar(result.data.disc_ar);
    setDisc_en(result.data.disc_en);
    setImage(result.data.image)
    setdata(result.data)
    // setis_student(result.data.is_admin);
   }



   const updateSingleStudent = async () => {
        let formField = new FormData()

        formField.append('image', data.image.files);

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/updateprofilex/${id}`,
            data: {
              "id": data.id,
              "title_ar": title_ar,
              "disc_ar": disc_ar,
              "title_en": title_en,
              "disc_en": disc_en,
              "image": tech5.files,
          }
        }).then(response => {
            console.log(response.data);
            history.push("/student_profile");
        })

    }



    

    return (
        <div class="container5">
  
        <DashNav />
        
            <section class="main">
       

       <br></br>
       <br></br>
       <br></br>
        <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Update Profile</h2>
    

    {/* <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div> */}

      <div className="form-group">
      <label for="title_ar">title ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Name"
          name="title_ar"
          value={title_ar}
          onChange={(e) => setTitle_ar(e.target.value)}
        />
      </div>
     
      <div className="form-group">
      <label for="title_en">Title en</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your E-mail Address"
          name="title_en"
          value={title_en}
          onChange={(e) => setTitle_en(e.target.value)}
        />
      </div>
      <div className="form-group">
      <label for="disc_ar">Disc ar</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Phone Number"
          name="disc_ar"
          value={disc_ar}
          onChange={(e) => setDisc_ar(e.target.value)}
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

      



      <button onClick={updateSingleStudent} className="btn btn-primary btn-block">Update Student</button>
   
  </div>
</div>
</section>
  </div>
 
    );
};

export default UpdateStudentProfile;