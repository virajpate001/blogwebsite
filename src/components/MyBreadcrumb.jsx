import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ pagename, imgurl }) {
  return (
    <>
      <div className="w-full p-4">
        <div
          className="m-auto w-full rounded-3xl bg-[url(${imgurl})] bg-cover py-40 text-center text-white"
          style={{ backgroundImage: `url(${imgurl})` }}
        >
          <h2 className="mb-1 text-5xl font-bold">{pagename}</h2>
          <p>
            <Link to="/">Home</Link> / {pagename}
          </p>
        </div>
      </div>
    </>
  );
}

export default Breadcrumb;
