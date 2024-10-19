import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCategoryArticle, fetchSingleCategory } from "../services/api";
import axios from "axios";
import Breadcrumb from "../components/MyBreadcrumb";
import Filter from "../components/Filter";
import BlogCard from "../components/BlogCard";
import breadcrumimg from "../assets/img/finel.jpg";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [articles, setArticle] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        const response = await fetchSingleCategory(slug);
        const category = response[0].attributes;
        const categoryName = category.Name;
        setCategoryName(categoryName);

        // Fetch the articles related to this category
        const catid = response[0].id;

        const getCategoryArtiles = async () => {
          const response = await fetchCategoryArticle(catid);
          setArticle(response);
        };

        getCategoryArtiles();
      } catch (error) {
        setError(error.message);
      }
    };

    getSingleCategory();
  }, [slug]);

  // loading and error code
  if (articles.length === 0 && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
