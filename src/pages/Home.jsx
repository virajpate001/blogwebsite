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
      <div className=" px-8 py-8 sm:px-12 ">
        <MainSlider mainslider={slider} />

        <section className=" py-4">
          <CategoryList />
        </section>

        <div className=" py-4">
          <div className="flex flex-wrap gap-14">
            <div className="w-full sm:w-3/4">
              <div className=" mb-6">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
                  Trending Posts
                </h2>
              </div>
              <HomeArticles />
              <div className="mt-10 text-center">
                <Link
                  to={"/blog"}
                  className="rounded-3xl bg-yellow-400 px-4 py-2 text-sm"
                  href="/category/learning"
                >
                  View More
                </Link>
              </div>
            </div>
            <div className="w-full sm:w-1/5">
              <RecentPost rPost={rPost} categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
