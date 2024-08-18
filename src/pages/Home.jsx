import React, { useEffect, useState } from "react";

import Articles from "../components/Articles";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <div className=" py-16">
      <Articles />
      </div>
    </>
  );
}

export default Home;
