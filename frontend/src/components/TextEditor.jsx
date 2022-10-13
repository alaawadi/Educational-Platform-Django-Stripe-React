import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import CreateBlog from "../pages/CreateBlog";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

 
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  
  


  PostItem = e => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('title_ar', e.target.title_ar.value);
  formField.append('title_en', e.target.title_en.value);
  formField.append('disc_ar', e.target.disc_ar.value);
  formField.append('disc_en', e.target.disc_en.value);
  formField.append('content', draftToHtml(convertToRaw(this.state.getCurrentContent())));
  formField.append('content2', e.target.title_ar.value);
  formField.append('image', e.target.image.files[0]);
  formField.append('is_blog', true);
  formField.append('user', 1);

  let response = fetch('http://127.0.0.1:8000/Blog_list/', {
      method:'POST',
      body:formField
  },[])


  if(response.status === 201){
    alert('Created sucssesfuly!')
    // history.push('/profile')  
  }else{
    alert('something error!')
      // window.location.reload()
  }
}

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
<form class="form1" onSubmit={this.PostItem}>

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




