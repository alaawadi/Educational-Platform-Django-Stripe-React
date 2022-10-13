import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './dashboard.css';
import DashNav from '../components/DashNav';

const UpdateStudent = () => {

    let history = useHistory();
    const { id } = useParams();

    // const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [is_tech, setis_tech] = useState(null)
    const [is_student, setis_student] = useState(null)
    const [data, setdata] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/showSingleStudent/${id}`);
    console.log(result.data.username);

    // setImage(result.data.image);
    setName(result.data.username);
    setEmail(result.data.email);
    setis_tech(result.data.is_tech);
    setis_student(result.data.is_student);
    setdata(result.data)
    // setis_student(result.data.is_admin);
   }


// // Update s single student by id
// let PostItem = async (e )=> {

//     e.preventDefault()
    
//     let response = await fetch(`http://127.0.0.1:8000/updateStudent/${id}`, {
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//             'username':name,
//             'email':email,
//             'is_tech':is_tech,
//             'is_student':is_student,
//             'id':data.id,
//             'password':data.password,
//             'last_login':data.last_login,
//             'is_superuser':data.is_superuser,
//             'first_name':data.first_name,
//             'last_name':data.last_name,
//             'is_staff':data.is_staff,
//             'is_active':data.is_active,
//             'date_joined':data.date_joined,
//             'groups':data.groups,
//             'user_permissions':data.user_permissions
//         })
//     },[setIsLoading(false)])
//     history.push("/dashboard");

//     if(response.status == 200){
//       alert('Created sucssesfuly!')  
//     }else{
//       alert('something error!')
//         // history.push('/')
//         // window.location.reload()
//     }
// }



   const updateSingleStudent = async () => {
        let formField = new FormData()

        formField.append('username',name)
        formField.append('email',email)
        formField.append('is_tech',is_tech)
        formField.append('is_student',is_student)
        // formField.append('id',data.id)
        // // formField.append('password',data.password)
        // formField.append('last_login',data.last_login)
        // formField.append('is_superuser',data.is_superuser)
        // // formField.append('first_name',data.first_name)
        // // formField.append('last_name',data.last_name)
        // formField.append('is_staff',data.is_staff)
        // formField.append('is_active',data.is_active)
        // formField.append('date_joined',data.date_joined)
        // formField.append('groups',data.groups)
        // formField.append('user_permissions',data.user_permissions)
        
        // if(image !== null) {
        //   formField.append('image', image)
        // }

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/updateStudent/${id}`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/dashboard");
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
    <h2 className="text-center mb-4">Update User</h2>
    

    {/* <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div> */}

      <div className="form-group">
      <label for="name">Name</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
     
      <div className="form-group">
      <label for="email">Email</label>
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Enter Your E-mail Address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
      <label for="is_tech">is_tech?</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Phone Number"
          name="is_tech"
          value={is_tech}
          onChange={(e) => setis_tech(e.target.value)}
        />
      </div>


      <div className="form-group">
      <label for="is_student">is_student?</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your address Name"
          name="is_student"
          value={is_student}
          onChange={(e) => setis_student(e.target.value)}
        />
      </div>



      <button onClick={updateSingleStudent} className="btn btn-primary btn-block">Update Student</button>
   
  </div>
</div>
</section>
  </div>
 
    );
};

export default UpdateStudent;