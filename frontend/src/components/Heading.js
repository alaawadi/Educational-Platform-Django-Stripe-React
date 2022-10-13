
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Heading = (props) => {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/home/')
        .then((result) => {
          setdata(result.data);
          setIsLoading(false);
        });
    }, [isLoading]);
    console.log(data);
  
    
    const [t, i18n] = useTranslation();
    const tdata = data.slice(0,2).map((item) => {
      if(i18n.language === 'ar') {
          
          return ({
              'title': props.title_ar,
              'home':'الرئيسية',
              'course':props.courses_ar
          });
          
      }
      return ({
          'title': props.title_en,
          'home':'home',
          'course':props.courses_en
      });
  
  });
    return (
        <>

            

<section className="heading">
    <h3>{props.title}</h3>
    {tdata ? tdata.slice(0,2).map((item) => (
          <p> <a><Link to="/">{item.home} |</Link><Link to="/courses">{item.course} </Link></a>{item.title} </p>
    )) : <p>no post yet!</p>}

    
</section>



        </>
    )
}

export default Heading



