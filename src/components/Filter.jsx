import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";

import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchCategories, fetchTags } from "../services/api";

function Filter() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const getCategory = await fetchCategories();
        console.log(getCategory);
        setCategories(getCategory);
      } catch (error) {
        console.log(error);
      }
    };

    const getTags = async () => {
      try {
        const getTags = await fetchTags();
        setTags(getTags);
      } catch (error) {
        setError(error);
      }
    };

    getCategories();
    getTags();
  }, []);

  return (
    <>
      <div className="m-auto w-11/12 py-10">
        <div className="flex">
          <button
            onClick={() => setOpen(true)}
            className="mr-3 rounded-3xl border bg-white px-5 py-2"
          >
            Categories <MdKeyboardArrowDown className="inline-block " />
          </button>
          <button className="rounded-3xl border bg-white px-5 py-2">
            Tags
            <MdKeyboardArrowDown className="inline-block  ml-3" />
          </button>
        </div>
      </div>

      <div>
        <ul className=" bg-slate-300">
          {tags.map((tags) => (
            <li key={tags.id}>
              <Link to={`/category/${tags.attributes.slug}`}>
                {tags.attributes.Name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4 border-b border-neutral-100 dark:border-neutral-700 md:py-5">
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => setOpen(false)}
                    className="cursor-pointer flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <IoCloseOutline />
                  </div>
                  <div
                    className="font-medium text-xl mt-3 text-center sm:ml-4 sm:mt-0 
									"
                  >
                    Discover other categories
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="py-4 px-6 ">
                {categories.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No Categories Found
                  </p>
                ) : (
                  <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {categories.map((allcategories) => (
                      <li key={allcategories.id} className="flex">
                        <Link to={`/category/${allcategories.attributes.slug}`}>
                          <img
                            src={
                              allcategories.attributes.cat_img.data.attributes
                                .url
                            }
                            alt=""
                            className="w-12 rounded-lg mr-4"
                          />
                        </Link>
                        <div>
                          <Link
                            to={`/category/${allcategories.attributes.slug}`}
                          >
                            <h2 className="catName">
                              {allcategories.attributes.Name}
                            </h2>
                            <span>
                              <span className="mr-2">
                                {allcategories.attributes.articles.data.length}
                              </span>
                              Article
                            </span>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Filter;
