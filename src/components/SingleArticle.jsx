import React, { useEffect, useState } from "react";
import { fetchSingleArticle } from "../services/api";
import { Link, useParams } from "react-router-dom";

function SingleArticle() {
  const { id } = useParams();
  const [singleArticle, setSingleArticle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getsArticle = async () => {
      try {
        const getArticle = await fetchSingleArticle(id);
        setSingleArticle(getArticle);
      } catch (error) {
        setError(error.message);
      }
    };

    getsArticle();
  }, [id]);

  if (!singleArticle && !error) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* {console.log(singleArticle.attributes.category.data.attributes.Name)} */}
      <div className="w-full px-4 py-4">
        <div className="m-auto w-full bg-cover  text-center text-white">
          <img
            src={singleArticle.attributes.profile_img.data.attributes.url}
            alt={singleArticle.attributes.Title}
            className=" rounded-3xl w-full"
          />
        </div>
      </div>

      <div className="m-auto w-4/5 my-4">
        <div className="category">
          <div className="mb-2 flex justify-between gap-4 items-center">
            <Link
              to={
                singleArticle.attributes.category.data
                  ? `/category/${singleArticle.attributes.category.data.attributes.slug}`
                  : `#`
              }
              className="rounded-3xl bg-yellow-400 px-3 py-0.5 text-sm"
            >
              {singleArticle.attributes.category.data
                ? singleArticle.attributes.category.data.attributes.Name
                : "Category"}
            </Link>

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
