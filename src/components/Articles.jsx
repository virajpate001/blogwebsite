import React, { useEffect, useState } from "react";
import { fetchArticles, fetchArticlespagination } from "../services/api";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";

function Articles() {
  const [articles, setArticle] = useState([]);
  const [categories, setCategorie] = useState([]);
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
      <div className="m-auto w-11/12 ">
        <BlogCard articles={articles} />

        <Pagination
          onPageChange={onPageChange}
          pageSize={pageSize}
          cpage={cpage}
        />
      </div>
    </>
  );
}

export default Articles;
