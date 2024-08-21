import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchAllArticles, fetchArticlespagination, fetchCategories } from "../services/api";
import { Link } from "react-router-dom";

const Testing = () => {
  const [myData, setMydata] = useState([]);
  const [error, setError] = useState("");
  const [myCategories, setMycategories] =useState([])

 

  useEffect(() => {
    const getArticle = async () => {
      try {
        const getarticles = await fetchArticlespagination(1,5);
        setMydata(getarticles);
        console.log(myData)
      
      } catch (error) {
        setError(error.message);
    
      }
    };


    const getCategories = async () =>{
     
      try{
        const getCategories = await fetchCategories();
        setMycategories(getCategories)

      }
      catch(error){
        setError(error.message);
      }

    }
  


                 
    getArticle();
    getCategories();
   
  }, []);



  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Testing 1</h1>
     
      <div>
        <ul>
          {myCategories.map((categories) => (
            <li key={categories.id}>
             

              <Link to={`/category/${categories.attributes.slug}`}>{categories.attributes.name}</Link>
              
              
            </li>
          ))}
        </ul>

       

      </div>
    </div>
  );
};

export default Testing;
