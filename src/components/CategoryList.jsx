import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();

        setCategories(response);
      } catch (error) {
        setError(error);
      }
    };

    getCategories();
  }, [categories]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-between sm:justify-center flex-wrap gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="px-8 sm:px-10 py-6 sm:py-8 w-45 sm:w-fit  rounded-md bg-gray-200 inline-block"
          >
            <Link to={`category/${category.attributes.slug}`}>
              <div className="relative mb-3">
                <img
                  className=" w-32 rounded-full"
                  src={category.attributes.cat_img.data.attributes.url}
                />
                <span className=" absolute top-0 right-0 count w-7 text-center inline-block bg-red-800 text-white rounded-full p-1 text-sm px-1 py-1">
                  12
                </span>
              </div>

              <h2 className=" text-center">{category.attributes.Name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
