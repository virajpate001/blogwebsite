import React from "react";
import { Link } from "react-router-dom";

const RecentPost = ({ rPost, categories }) => {
  return (
    <div>
      <div className="recent-post mb-8">
        <h2 className=" border-b pb-3 mb-4">Recent Post</h2>
        <div>
          <ul>
            {rPost.map((rPost) => (
              <li key={rPost.id}>
                <Link to={`/post/${rPost.attributes.slug}`}>
                  <div className="flex mb-4 gap-4">
                    <img
                      src={rPost.attributes.profile_img.data.attributes.url}
                      className=" w-20 h-20 object-cover rounded"
                    />
                    <h2> {rPost.attributes.Title.slice(0, 60)}...</h2>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="categories">
        <h2 className=" border-b pb-3 mb-4">Categories</h2>
        <div>
          {categories.length === 0 ? (
            <p className="text-center text-gray-500">No Categories Found</p>
          ) : (
            <ul className="grid grid-cols-2 gap-5">
              {categories.map((allcategories) => (
                <li key={allcategories.id} className="flex">
                  <Link to={`/category/${allcategories.attributes.slug}`}>
                    <img
                      src={allcategories.attributes.cat_img.data.attributes.url}
                      alt=""
                      className="w-12 rounded-lg mr-4"
                    />
                  </Link>
                  <div>
                    <Link to={`/category/${allcategories.attributes.slug}`}>
                      <h2 className="catName">
                        {allcategories.attributes.Name}
                      </h2>
                      <span>
                        <span className="mr-2">
                          {allcategories.attributes.articles.data.length}
                        </span>
                        Article
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
