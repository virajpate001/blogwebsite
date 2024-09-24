import React from "react";
import logo from "../assets/img/logo.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-10 border-t-2 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-11/12 mx-auto pb-10">
        <div className="mb-8 md:mb-0">
          <img src={logo} alt="logo" className="w-40" />
          <p className=" mb-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mb-8 md:mb-0">
          <ul className="flex gap-4 justify-center items-center h-full">
            <li className="mb-2">
              <Link to="/" className=" text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className=" text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className=" text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className=" text-sm">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <div className="flex gap-4 justify-end items-center h-full">
            <Link to="/">
              <FaFacebook className=" text-2xl" />
            </Link>
            <Link to="/">
              <FaInstagram className=" text-2xl" />
            </Link>
            <Link to="/">
              <FaYoutube className=" text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto border-t-2 pt-6">
        <p className=" text-center">
          Copywrite reserver by <Link to="/">Blog</Link> . Developed by{" "}
          <Link to="/">Viraj Pate</Link>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
