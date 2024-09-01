import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleTag } from "../services/api";
import Breadcrumb from "../components/MyBreadcrumb";
import axios from "axios";
import Filter from "../components/Filter";

const TagsPage = () => {
  const { slug } = useParams();
  const [tagName, setTagName] = useState("");
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetchSingleTag(slug);
        const tag = response[0].attributes;
        const tName = tag.Name;
        setTagName(tName);

        // Fetch articles related to tags

        const tagId = response[0];

        const articlesResponse = await axios.get(
          `http://localhost:1337/api/articles?populate=*&filters[tags][id][$eq]=${tagId.id}`
        );
        setArticle(articlesResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [slug]);

  return (
    <>
      <Breadcrumb pagename={tagName} />

      <Filter />

      <div className="m-auto w-11/12 ">
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

export default TagsPage;
