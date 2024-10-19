import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import { fetchAllArticles } from "../services/api";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allTitles, setAllTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllArticle = async () => {
      try {
        const articles = await fetchAllArticles();
        setAllTitles(articles);
      } catch (error) {
        console.log(error);
      }
    };

    getAllArticle();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = allTitles.filter((article) =>
        article.attributes.Title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredTitles(filtered);

      setShowSuggestions(true);
    } else {
      setFilteredTitles([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug) => {
    navigate(`/post/${slug}`);
    setOpen(false);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <>
      <button>
        <CiSearch
          onClick={() => setOpen(true)}
          className=" text-black text-2xl"
        />
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start  justify-center p-4 text-center sm:items-start  sm:p-0">
            <DialogPanel
              transition
              className="relative w-full top-20 sm:top-32 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white  px-4 pb-4 pt-4 sm:p-6 sm:pb-4 border-b border-neutral-100 dark:border-neutral-700 md:py-5">
                <div className="flex gap-4 ">
                  <CiSearch
                    onClick={() => setOpen(true)}
                    className=" text-black text-2xl"
                  />
                  <input
                    name="search"
                    className="w-full  focus:outline-none "
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                {showSuggestions && filteredTitles.length > 0 ? (
                  <ul className="suggestions-list">
                    {filteredTitles.map((article) => (
                      <li
                        key={article.id}
                        onClick={() =>
                          handleSuggestionClick(article.attributes.slug)
                        }
                        className="cursor-pointer py-1"
                      >
                        {article.attributes.Title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4">No Found</p>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchBar;
