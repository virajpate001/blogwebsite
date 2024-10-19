import React from "react";
import errorimg from "../assets/img/error-404.png";
import { Link } from "react-router-dom";

function BrakeLink() {
  return (
    <>
      <div className="bgimg">
        <div className="glassmorphism w-fill h-full">
          <div className="px-12 py-14">
            <div>
              <img className=" w-48 m-auto" src={errorimg} alt="404" />

              <div className=" text-center mt-6">
                <h2 className="text-xl leading-tight font-semibold text-neutral-900 md:text-3xl  dark:text-neutral-100">
                  The Page You Were Looking For Doesn't Exist{" "}
                </h2>
                <div className="mt-10 text-center">
                  <Link
                    to="/"
                    className="rounded-3xl bg-yellow-400 px-4 py-2 text-sm"
                    href="/blog"
                  >
                    GO TO HOMEPAGE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrakeLink;
