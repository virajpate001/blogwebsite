import React, { useEffect, useState } from "react";
import { fetchArticlespagination } from "../services/api";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

const HomeArticles = () => {
  const [articles, setArticle] = useState([]);
  const [error, setError] = useState("");
  const [cpage, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const getArticle = async () => {
      try {
        const getarticles = await fetchArticlespagination(cpage, pageSize);
        setArticle(getarticles);
      } catch (error) {
        setError(error.message);
      }
    };

    getArticle();
  }, [cpage, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // loading and error code
  if (articles.length === 0 && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="m-auto w-full ">
        {/* <BlogCard articles={articles} /> */}

        <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => {
            return (
              <li key={index}>
                <div className="rounded-xl shadow-md">
                  <div className="relative">
                    <Link to={`/post/${article.attributes.slug}`}>
                      <img
                        src={article.attributes.profile_img.data.attributes.url}
                        alt={article.attributes.Title}
                        className="w-full h-60 aspect-square object-cover"
                      />
                    </Link>
                  </div>
                  <Link to={`/post/${article.attributes.slug}`}>
                    <div className="px-4 py-6">
                      <div className="mb-2 flex justify-between">
                        <p className="name">Viraj Pate</p>
                        <p className="date text-sm text-gray-500">
                          May 20, 2021
                        </p>
                      </div>

                      <div>
                        <h2 className="text-lg font-medium leading-6">
                          {article.attributes.Title.slice(0, 60)}
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

        {/* <Pagination
          onPageChange={onPageChange}
          pageSize={pageSize}
          cpage={cpage}
        /> */}
      </div>
    </>
  );
};

export default HomeArticles;
