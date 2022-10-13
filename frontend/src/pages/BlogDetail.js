import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { format } from 'date-fns'
import Heading from '../components/Heading';

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/BlogModelDetailView/${id}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [id]);

    const createBlog = () => {
        return {__html: blog.content}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
<>
      <Header2 />
      <Heading title_en={blog.title_en} title_ar={blog.title_ar} />
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.title_en}</h1>
            <br></br>
            {/* <h2 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2> */}
            <h4> {blog.created_at} </h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/blogs' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
        <Footer />
</>
    );
};

export default BlogDetail;
