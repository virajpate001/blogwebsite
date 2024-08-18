import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchAllArticles, fetchArticleCount, fetchArticlespagination } from "../services/api";

const Testing = () => {
  const [myData, setMydata] = useState([]);
  const [error, setError] = useState("");

 

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


  


                 
    getArticle();
   
  }, []);



  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Testing 1</h1>
      <div>
        <ul>
          {myData.map((post) => (
            <li key={post.id}>
              <h1>{post.attributes.Title}</h1>
              
            </li>
          ))}
        </ul>

       

      </div>
    </div>
  );
};

export default Testing;
