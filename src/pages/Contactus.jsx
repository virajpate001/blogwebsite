import React from "react";
import abimg from "../assets/img/about-hero-right.534fc28b738f026ab253.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const Contactus = () => {
  return (
    <>
      <div className="bgimg">
        <div className="glassmorphism w-fill h-full">
          <div className="px-12 py-14">
            <div className="bg-white shadow-md px-12 py-10 rounded-3xl">
              <div className=" text-center mb-10">
                <h2 class="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
                  Contact us
                </h2>
                <span class="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                  Drop us message and we will get back for you.
                </span>
              </div>

              <div className="flex gap-5 justify-center">
                <div>
                  <div>
                    <div>
                      <h3>🗺 ADDRESS</h3>
                      <span class="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Photo booth tattooed prism, portland taiyaki hoodie
                        neutra typewriter
                      </span>
                    </div>

                    <div>
                      <h3>💌 EMAIL</h3>
                      <span class="block mt-2 text-neutral-500 dark:text-neutral-400">
                        nc.example@example.com
                      </span>
                    </div>

                    <div>
                      <h3>☎ PHONE</h3>
                      <span class="block mt-2 text-neutral-500 dark:text-neutral-400">
                        000-123-456-7890
                      </span>
                    </div>

                    <div>
                      <h3>🌏 SOCIALS</h3>
                      <div className="flex gap-4 mt-2 items-center h-full">
                        <Link to="/">
                          <FaFacebook className=" text-xl" />
                        </Link>
                        <Link to="/">
                          <FaInstagram className=" text-xl" />
                        </Link>
                        <Link to="/">
                          <FaYoutube className=" text-xl" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>Full name</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
