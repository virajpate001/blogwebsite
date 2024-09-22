import React from "react";
import Slider from "react-slick";
import slider1 from "../assets/img/slider1.webp";
import { Link } from "react-router-dom";

const MainSlider = ({ mainslider }) => {
  const settings = {
    dots: true, // Display navigation dots
    infinite: true, // Infinite scrolling
    // autoplay: true,
    // autoplaySpeed: 2000,
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    arrows: true,
    fade: true,
  };
  return (
    <>
      <Slider {...settings}>
        {mainslider.map((slider, index) => {
          return (
            <div key={index} className="sliderhight relative rounded-md">
              <Link to={slider.attributes.btnlink} className="rounded-md">
                <div>
                  <img
                    src={slider.attributes.sliderimg.data.attributes.url}
                    className=" object-cover w-full   sliderhight  rounded-md"
                  />
                </div>
                <div className=" w-full h-full bg-black absolute top-0 opacity-50 hover:opacity-60 rounded-md"></div>

                <div className="w-full  sm:w-2/4 absolute bottom-10 sm:bottom-1/4 left-6 sm:left-20">
                  <h2 className="title text-2xl sm:text-4xl text-white font-extrabold mb-4">
                    {slider.attributes.Title}
                  </h2>
                  <p className="subtitle text-zinc-200 mb-5 hidden sm:block">
                    {slider.attributes.description}
                  </p>

                  <button
                    to={slider.attributes.btnlink}
                    className=" px-4 py-2 text-white bg-white bg-opacity-30 rounded-sm"
                  >
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default MainSlider;
