import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCategory } from "../services/api";
import axios from "axios";
import Breadcrumb from "../components/MyBreadcrumb";
import Filter from "../components/Filter";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        const response = await fetchSingleCategory(slug);

        // const response = await axios.get(
        //   `http://localhost:1337/api/categories?filters[slug][$eq]=${slug}&populate=*`
        // );

        const category = response[0].attributes;
        const categoryName = category.Name;
        setCategoryName(categoryName);

        // Fetch the articles related to this category

        const catid = response[0];

        // const articlesResponse = await axios.get(`http://localhost:1337/articles?category=${catid.id}`)

        const articlesResponse = await axios.get(
          `http://localhost:1337/api/articles?populate=*&filters[category][id][$eq]=${catid.id}`
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
      <Breadcrumb pagename={categoryName} />
      <Filter />
      <div className="m-auto w-11/12 ">
        <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <li key={index}>
                <div className="rounded-xl shadow-md">
                  <div className="relative">
                    <Link to={`/post/${article.id}`}>
                      <img
                        src={article.attributes.profile_img.data.attributes.url}
                        alt={article.attributes.Title}
                        className="w-full h-60 aspect-square object-cover"
                      />
                    </Link>
                  </div>
                  <Link to={`/post/${article.id}`}>
                    <div className="px-4 py-6">
                      <div className="mb-2 flex justify-between">
                        <p className="name">Viraj Pate</p>
                        <p className="date text-sm text-gray-500">
                          May 20, 2021
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg font-medium leading-5">
                          {article.attributes.Title}
                          ...
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CategoryPage;
