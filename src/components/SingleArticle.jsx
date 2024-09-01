import React, { useEffect, useState } from "react";
import { fetchSingleArticle } from "../services/api";
import { Link, useParams } from "react-router-dom";

function SingleArticle() {
  const { slug } = useParams();
  const [singleArticle, setSingleArticle] = useState(null); // Initialized as null for better conditional rendering
  const [showcategories, setShowCategorie] = useState([]);
  const [showTags, setShowTags] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getsArticle = async () => {
      try {
        const getArticle = await fetchSingleArticle(slug);
        setSingleArticle(getArticle);
      } catch (error) {
        setError(error.message);
      }
    };

    getsArticle();
  }, [slug]);

  useEffect(() => {
    if (singleArticle) {
      console.log(singleArticle);
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

  return (
    <>
      <div>{console.log(singleArticle)}</div>
      <div className="w-full px-4 py-4">
        <div className="m-auto w-full bg-cover text-center text-white">
          <img
            src={singleArticle.attributes.profile_img.data.attributes.url}
            alt={singleArticle.attributes.Title}
            className="rounded-3xl w-full"
          />
        </div>
      </div>

      <div className="m-auto w-4/5 my-4">
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
          {singleArticle.attributes.Description}
        </div>

        <div className="tags mt-4">
          <div className="mb-2 flex justify-between gap-4 items-center">
            {showTags.length === 0 ? (
              <ul>
                <li className="rounded-3xl bg-yellow-400 px-4 py-2 text-sm">
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
    </>
  );
}

export default SingleArticle;
