import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCategory } from "../services/api";
import axios from "axios";
import Breadcrumb from "../components/MyBreadcrumb";
import Filter from "../components/Filter";
import BlogCard from "../components/BlogCard";
import breadcrumimg from "../assets/img/finel.jpg";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        const response = await fetchSingleCategory(slug);
        const category = response[0].attributes;
        const categoryName = category.Name;
        setCategoryName(categoryName);

        // Fetch the articles related to this category

        const catid = response[0];

        const articlesResponse = await axios.get(
          `http://localhost:1337/api/articles?populate=*&filters[categories][id][$eq]=${catid.id}`
        );

        setArticle(articlesResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCategory();
  }, [slug]);

  return (
    <>
      <Breadcrumb pagename={categoryName} imgurl={breadcrumimg} />
      <Filter />
      <div className="m-auto w-11/12 ">
        <BlogCard articles={articles} />
      </div>
    </>
  );
};

export default CategoryPage;
