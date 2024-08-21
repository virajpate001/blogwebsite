import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCategory } from "../services/api";
import axios from "axios";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        // const response = await fetchSingleCategory(slug);

        const response = await axios.get(
          `http://localhost:1337/api/categories?slug=sss`
        );
     
         console.log(response)

        const category = response.data.data[0].attributes.name;
        setCategoryName(category);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCategory();
  }, [slug]);

  return (
    <div>
      <h1>Articles in {categoryName}</h1>
    </div>
  );
};

export default CategoryPage;
