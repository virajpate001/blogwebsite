import React from "react";
import Articles from "../components/Articles";
import Breadcrumb from "../components/MyBreadcrumb";
import Filter from "../components/Filter";
import breadcrumimg from "../assets/img/finel.jpg";

function Blog() {
  return (
    <>
      <Breadcrumb pagename="Blog" imgurl={breadcrumimg} />
      <Filter />
      <Articles />
    </>
  );
}

export default Blog;
