"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchArticleInput = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(searchText);
    router.push(`/articles/search?searchText=${searchText}`);
  };

  return (
    <form onSubmit={formSubmitHandler} className="relative">
      <label htmlFor="Search" className="sr-only">
        {" "}
        Search for...{" "}
      </label>

      <input
        type="search"
        id="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search for articles"
        className="md:w-[400px] block md:ml-auto w-full px-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </form>
  );
};

export default SearchArticleInput;
