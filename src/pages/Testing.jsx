import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchArticlespagination,
  fetchCategories,
  fetchRecentArticles,
  fetchTags,
} from "../services/api";
import { Link } from "react-router-dom";

const Testing = () => {
  const [myData, setMydata] = useState([]);
  const [error, setError] = useState("");
  const [myCategories, setMycategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [rPost, setRpost] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const getarticles = await fetchArticlespagination(1, 5);
        setMydata(getarticles);
      } catch (error) {
        setError(error.message);
      }
    };

    const getCategories = async () => {
      try {
        const getCategories = await fetchCategories();
        setMycategories(getCategories);
      } catch (error) {
        setError(error.message);
      }
    };

    const getTags = async () => {
      try {
        const getTags = await fetchTags();
        setTags(getTags);
      } catch (error) {
        setError(error);
      }
    };

    const getRecentArticle = async () => {
      try {
        const getRecentArt = await fetchRecentArticles();
        console.log(getRecentArt);
        setRpost(getRecentArt);
      } catch (error) {
        setError(error);
      }
    };

    // getArticle();
    // getCategories();
    // getTags();
    getRecentArticle();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Testing 1</h1>

      <div>
        <ul>
          {rPost.map((rPost) => (
            <li key={rPost.id}>
              <img
                src={rPost.attributes.profile_img.data.attributes.url}
                className=" w-20 h-20 object-cover"
              />
              <Link to={`/category/${rPost.attributes.slug}`}>
                {rPost.attributes.Title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testing;
