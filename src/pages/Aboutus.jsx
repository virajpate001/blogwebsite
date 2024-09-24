import React from "react";

import abimg from "../assets/img/about-hero-right.534fc28b738f026ab253.png";

const Aboutus = () => {
  return (
    <>
      <div className="bgimg">
        <div className="glassmorphism w-fill h-full">
          <div className="px-12 py-14">
            <div className=" flex-col-reverse md:flex-row flex flex-wrap justify-center items-center gap-10">
              <div className="w-full sm:w-5/12">
                <h2 class="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
                  👋 About Us.
                </h2>
                <p class="block mt-5 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                  We’re impartial and independent, and every day we create
                  distinctive, world-class programmes and content which inform,
                  educate and entertain millions of people in the around the
                  world.
                </p>

                <p class="block mt-2 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                  We’re impartial and independent, and every day we create
                  distinctive, world-class programmes and content which inform,
                  educate and entertain millions of people in the around the
                  world.
                </p>

                <p class="block mt-2 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                  We’re impartial and independent, and every day we create
                  distinctive, world-class programmes and content which inform,
                  educate and entertain millions of people in the around the
                  world.
                </p>
              </div>

              <div className="w-full md:w-5/12">
                <img src={abimg} alt="aboutus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
