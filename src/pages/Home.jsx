import React, { useEffect, useState } from "react";

import Articles from "../components/Articles";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import MainSlider from "../components/MainSlider";
import { fetchSliders } from "../services/api";

function Home() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const getSlider = async () => {
      const getSliders = await fetchSliders();
      setSlider(getSliders);
    };

    getSlider();
  }, []);

  return (
    <>
      <div className=" px-8 py-8 sm:px-12 ">
        {/* {console.log(slider)} */}
        <MainSlider mainslider={slider} />
        {/* <Articles /> */}
      </div>
    </>
  );
}

export default Home;
