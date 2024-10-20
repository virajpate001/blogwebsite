import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleTag, fetchTagsArticle } from "../services/api";
import Breadcrumb from "../components/MyBreadcrumb";
import axios from "axios";
import Filter from "../components/Filter";
import BlogCard from "../components/BlogCard";
import breadcrumimg from "../assets/img/finel.jpg";

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

        const tagId = response[0].id;

        const getTagArtiles = async () => {
          const response = await fetchTagsArticle(tagId);
          setArticle(response);
        };

        getTagArtiles();

        // const articlesResponse = await axios.get(
        //   `http://localhost:1337/api/articles?populate=*&filters[tags][id][$eq]=${tagId.id}`
        // );
        // setArticle(articlesResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [slug]);

  return (
    <>
      <Breadcrumb pagename={tagName} imgurl={breadcrumimg} />

      <Filter />

      <div className="m-auto w-11/12 ">
        <BlogCard articles={articles} />
      </div>
    </>
  );
};

export default TagsPage;
