import React, { useEffect, useState } from "react";
import { fetchSingleArticle } from "../services/api";
import { Link, useParams } from "react-router-dom";

function SingleArticle() {
  const { slug } = useParams();
  const [singleArticle, setSingleArticle] = useState(null); // Initialized as null for better conditional rendering
  const [showcategories, setShowCategorie] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getsArticle = async () => {
      try {
        const getArticle = await fetchSingleArticle(slug);
        setSingleArticle(getArticle);
        console.log(getArticle);
      } catch (error) {
        setError(error.message);
      }
    };

    getsArticle();
  }, [slug]);

  useEffect(() => {
    if (singleArticle) {
      setShowCategorie(singleArticle.attributes.categories.data);
    }
  }, [singleArticle]);

  if (!singleArticle && !error) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

      <div className="m-auto w-4/5 my-4">
        <div className="category">
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
              <p className="name">Viraj Pate</p>
              <p className="date text-sm text-gray-500">May 20, 2021</p>
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
      </div>
    </>
  );
}

export default SingleArticle;
