import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ articles }) => {
  return (
    <>
      <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
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
                      <p className="date text-sm text-gray-500">May 20, 2021</p>
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
    </>
  );
};

export default BlogCard;
