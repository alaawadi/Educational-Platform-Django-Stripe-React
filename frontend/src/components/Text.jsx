// // import React, { Component } from "react";

// import React, {useState, useEffect} from 'react'
// import axios from 'axios';
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";

// const Heading = () => {
//     const [editorState, seteditorState] =  EditorState.createEmpty();
//     onEditorStateChange = (editorState) => {
//         seteditorState(editorState)
//       };

//     return (
//         <>

            
// <div>
//         <input type='text' placeholder='title' />
//         <input type='text' placeholder='disc' />
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            
//         ></textarea>
//         {/* <CreateBlog content={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
//       </div>

//         </>
//     )
// }

// export default Heading



