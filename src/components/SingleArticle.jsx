import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchRecentArticles,
  fetchRelatedArticle,
  fetchSingleArticle,
} from "../services/api";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // Import rehype-raw plugin to allow HTML parsing
import rehypeSanitize from "rehype-sanitize";
import RecentPost from "./RecentPost";
import BlogCard from "./BlogCard";

function SingleArticle() {
  const { slug } = useParams();
  const [singleArticle, setSingleArticle] = useState(null); // Initialized as null for better conditional rendering
  const [showcategories, setShowCategorie] = useState([]);
  const [showTags, setShowTags] = useState([]);
  const [error, setError] = useState("");
  const [rPost, setRpost] = useState([]);
  const [categories, setCategories] = useState([]);
  const [relatedPost, setRelatedPost] = useState([]);

  useEffect(() => {
    const getsArticle = async () => {
      try {
        const getArticle = await fetchSingleArticle(slug);
        setSingleArticle(getArticle);

        // Fetch related articles based on categories

        const categoryIds = getArticle.attributes.categories.data.map(
          (cat) => cat.id
        );

        const related = await fetchRelatedArticle(categoryIds, getArticle.id);
        setRelatedPost(related);
      } catch (error) {
        setError(error.message);
      }
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

    getsArticle();
    getRecentArticle();
    getCategories();
  }, [slug]);

  useEffect(() => {
    if (singleArticle) {
      setShowCategorie(singleArticle.attributes.categories.data);
      setShowTags(singleArticle.attributes.tags.data);
    }
  }, [singleArticle, showTags]);

  if (!singleArticle && !error) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const contentMarkdown = singleArticle.attributes.content;
  return (
    <>
      <div className="w-full px-4 py-4">
        <div className="m-auto w-full bg-cover text-center text-white">
          <img
            src={singleArticle.attributes.profile_img.data.attributes.url}
            alt={singleArticle.attributes.Title}
            className="rounded-3xl w-full"
          />
        </div>
      </div>

      <div className="m-auto w-11/12 my-4">
        <div className="flex flex-wrap gap-14">
          <div className="w-full sm:w-3/4">
            <div className="category mb-8">
              <div className="mb-2 flex justify-between gap-4 items-center">
                {showcategories.length === 0 ? (
                  <ul>
                    <li className="rounded-3xl bg-yellow-400 px-4 py-2 text-sm">
                      unauthorized
                    </li>
                  </ul>
                ) : (
                  <ul className="flex gap-2">
                    {showcategories.map((catlist) => (
                      <li key={catlist.id}>
                        <Link
                          to={`/category/${catlist.attributes.slug}`}
                          className="rounded-3xl bg-yellow-400 px-4 py-2 text-sm"
                        >
                          {catlist.attributes.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex gap-4">
                  <p className="name">
                    {singleArticle.attributes.author.data.attributes.Name}
                  </p>
                  {/* <p className="date text-sm text-gray-500">May 20, 2021</p> */}
                  {/* {singleArticle.attributes.createdAt} */}

                  {new Date(
                    singleArticle.attributes.publishedAt
                  ).toLocaleDateString("en-US", {
                    month: "long", // Full month name
                    day: "numeric", // Numeric day
                    year: "numeric", // Full year
                  })}
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold my-3">
              {singleArticle.attributes.Title}
            </h1>
            <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="text-neutral-500 py-4">
              {/* {singleArticle.attributes.content} */}
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {contentMarkdown}
              </ReactMarkdown>
            </div>

            <div className="tags mt-4">
              <div className="mb-2 flex justify-between gap-4 items-center">
                {showTags.length === 0 ? (
                  <ul>
                    <li className="rounded-xl bg-white hover:bg-neutral-50 px-4 py-2 text-sm">
                      notag
                    </li>
                  </ul>
                ) : (
                  <ul className="flex gap-2">
                    {showTags.map((taglist) => (
                      <li key={taglist.id}>
                        <Link
                          to={`/tags/${taglist.attributes.slug}`}
                          className="rounded-xl bg-white hover:bg-neutral-50 px-4 py-2 text-sm"
                        >
                          {taglist.attributes.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/5">
            <RecentPost rPost={rPost} categories={categories} />
          </div>
        </div>
      </div>

      <div className="m-auto w-11/12 my-4 relatedpost mt-20">
        <h2 className=" border-b pb-3 mb-6 text-2xl">Related posts</h2>
        {relatedPost.length ? (
          <BlogCard articles={relatedPost} />
        ) : (
          <p>Related Post Not Available</p>
        )}
      </div>
    </>
  );
}

export default SingleArticle;
