import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchArticlespagination,
  fetchCategories,
  fetchTags,
} from "../services/api";
import { Link } from "react-router-dom";

const Testing = () => {
  const [myData, setMydata] = useState([]);
  const [error, setError] = useState("");
  const [myCategories, setMycategories] = useState([]);
  const [tags, setTags] = useState([]);

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

    getArticle();
    getCategories();
    getTags();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Testing 1</h1>

      <div>
        <ul className=" bg-slate-300">
          {tags.map((tags) => (
            <li key={tags.id}>
              <Link to={`/category/${tags.attributes.slug}`}>
                {tags.attributes.Name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {/* {console.log(myCategories)} */}
          {myCategories.map((mycate) => (
            <li key={mycate.id}>
              <Link to={`/category/${mycate.attributes.slug}`}>
                {mycate.attributes.Name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testing;
