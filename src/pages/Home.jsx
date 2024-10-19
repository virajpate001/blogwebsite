import React, { useEffect, useState } from "react";

import Articles from "../components/Articles";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import MainSlider from "../components/MainSlider";
import {
  fetchCategories,
  fetchRecentArticles,
  fetchSliders,
} from "../services/api";
import RecentPost from "../components/RecentPost";
import HomeArticles from "../components/HomeArticles";
import CategoryList from "../components/CategoryList";

function Home() {
  const [slider, setSlider] = useState([]);
  const [rPost, setRpost] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getSlider = async () => {
      const getSliders = await fetchSliders();
      setSlider(getSliders);
    };

    const getRecentArticle = async () => {
      try {
        const getRecentArt = await fetchRecentArticles();
        setRpost(getRecentArt);
      } catch (error) {
        setError(error);
      }
    };

    const getCategories = async () => {
      try {
        const getCategory = await fetchCategories();

        setCategories(getCategory);
      } catch (error) {
        console.log(error);
      }
    };

    getSlider();
    getRecentArticle();
    getCategories();
  }, []);

  return (
    <>
      <Articles />
    </>
  );
}

export default Home;
