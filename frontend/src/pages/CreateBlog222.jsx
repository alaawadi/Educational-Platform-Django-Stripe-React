import React, { Component } from "react";
import { useHistory, useParams } from 'react-router-dom';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from 'axios';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import CreateBlog from "../pages/CreateBlog";

export default class TextEditor extends Component {
  state = {
    editorState: null,
    title_ar: null,
    title_en: null,
    disc_ar: null,
    disc_en:null,
    image: null,
    data: null
  };

  id  = useParams();
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };



  loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/showSingleBlog/${this.id}`);
    console.log(result.data);

    this.setState.title_ar(result.data.title_ar);
    this.setState.title_en(result.data.title_en);
    this.setState.disc_ar(result.data.disc_ar);
    this.setState.disc_en(result.data.disc_en);
    this.setState.image(result.data.image.files[0])
    this.setState.editorState(result.data.content)
    this.setState.data(result.data)
    // setis_student(result.data.is_admin);
   }



  updateSingleStudent = async () => {
    let formField = new FormData()

    formField.append('id', this.state.data.id);
    formField.append('title_ar', this.state.title_ar);
    formField.append('title_en', this.state.title_en);
    formField.append('disc_ar', this.state.disc_ar);
    formField.append('disc_en', this.state.disc_en);
    formField.append('content', this.state.editorState);
    formField.append('content2', this.state.title_en);
    formField.append('image', this.state.image);

    formField.append('slug', this.state.data.slug);
    formField.append('created_at', this.state.data.created_at);
    formField.append('upload_to', this.state.data.upload_to);
    formField.append('is_serv', this.state.data.is_serv);
    formField.append('is_blog', this.state.data.is_blog);
    formField.append('is_project', this.state.data.is_project);
    formField.append('user', this.state.data.user);
    formField.append('course', this.state.data.course);
    formField.append('blog_Category', this.state.data.course);
    formField.append('project_Category', this.state.data.course);
    formField.append('like', this.state.data.course);

    await axios({
        method: 'PUT',
        url: `http://127.0.0.1:8000/upBlog/${this.id}`,
        data: formField
    }).then(response => {
        console.log(response.data);
        // history.push("/dashboard4");
    })

}








  
  // PostItem = e => {
  //   debugger
  //   e.preventDefault();

  //   let formField = new FormData()

  // formField.append('title_ar', e.target.title_ar.value);
  // formField.append('title_en', e.target.title_en.value);
  // formField.append('disc_ar', e.target.disc_ar.value);
  // formField.append('disc_en', e.target.disc_en.value);
  // formField.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
  // formField.append('content2', e.target.title_ar.value);
  // formField.append('image', e.target.image.files[0]);
  // formField.append('is_blog', true);
  // formField.append('user', 1);
  //   axios
  //     .post("http://127.0.0.1:8000/Blog_list/", formField)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // };



  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div>
        

        <div class="container5">
  
        
        
  <section class="main">


<br></br>
<br></br>
<br></br>
<div className="container">
<div className="w-75 mx-auto shadow p-5">
<h2 className="text-center mb-4">Create Blog</h2>


{/* <div className="form-group">
<img src={image} height="100" width="200" alt="" srcSet="" />
<label>Upload Image</label>
<input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
</div> */}
<form class="form1">

<div className="form-group">
<label for="title_ar">title ar</label>
<input
type="text"
className="form-control form-control-lg"
placeholder="Enter Your Name"
name="title_ar"
onChange={e => this.setState.title_ar(e.target.value)}
value={this.state.title_ar}
/>
</div>

<div className="form-group">
<label for="title_en">Title en</label>
<input
type="text"
className="form-control form-control-lg"
placeholder="Enter Your E-mail Address"
name="title_en"
onChange={e => this.setState.title_en(e.target.value)}
value={this.state.title_en}
/>
</div>

<div className="form-group">
<label for="disc_ar">Disc ar</label>
<input
type="text"
className="form-control form-control-lg"
placeholder="Enter Your Phone Number"
name="disc_ar"
onChange={e => this.setState.disc_ar(e.target.value)}
value={this.state.disc_ar}
/>
</div>


<div className="form-group">
<label for="disc_en">Disc en</label>
<input
type="text"
className="form-control form-control-lg"
placeholder="Enter Your Phone Number"
name="disc_en"
onChange={e => this.setState.disc_en(e.target.value)}
value={this.state.disc_en}
/>
</div>

<div className="form-group">
<label for="image">Image</label>
<input
type="file"
name="image"
onChange={e => this.setState.image(e.target.files[0])}
/>
</div>


        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            
        ></textarea>




<button type='submit' className="btn btn-primary btn-block">Create</button>
</form>
</div>
</div>
</section>
</div>

      </div>
    );
  }
}




