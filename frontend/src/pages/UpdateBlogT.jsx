import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './dashboard.css';
import DashNav from '../components/DashNav';
import tech5 from '../images/teacher-5.png'
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

const UpdateBlog = () => {

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
    const [content, setContent] = useState(null)
    const [image, setImage] = useState(null)
    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/showSingleBlog/${id}`);
    console.log(result.data);

    setTitle_ar(result.data.title_ar);
    setTitle_en(result.data.title_en);
    setDisc_ar(result.data.disc_ar);
    setDisc_en(result.data.disc_en);
    setImage(result.data.image)
    setContent(result.data.content)
    setdata(result.data)
    // setis_student(result.data.is_admin);
   }



   const updateSingleStudent = async () => {
        let formField = new FormData()

        formField.append('id', data.id);
        formField.append('title_ar', title_ar);
        formField.append('title_en', title_en);
        formField.append('disc_ar', disc_ar);
        formField.append('disc_en', disc_en);
        formField.append('content', content);
        formField.append('content2', content);
        formField.append('image', image);

        formField.append('slug', data.slug);
        formField.append('created_at', data.created_at);
        formField.append('upload_to', data.upload_to);
        formField.append('is_serv', data.is_serv);
        formField.append('is_blog', data.is_blog);
        formField.append('is_project', data.is_project);
        formField.append('user', data.user);
        formField.append('course', data.course);
        formField.append('blog_Category', data.blog_Category);
        formField.append('project_Category', data.project_Category);
        formField.append('like', data.like);

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/upBlog/${id}`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/profile");
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
    <h2 className="text-center mb-4">Update Blog</h2>
    

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

export default UpdateBlog;