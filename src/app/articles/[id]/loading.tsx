import React from "react";

const loading = () => {
  return (
    <section className="m-auto w-full px-5 pt-8 md:w-3/4 animate-pulse">
      <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-800 dark:shadow-gray-700/25 ">
        <span className="inline-block w-[40px] h-[40px] rounded bg-gray-700 p-2"></span>

        <h3 className="mt-1 mb-1 w-[150px] h-[20px] bg-gray-700 rounded-sm"></h3>

        <time
          dateTime="2022-10-10"
          className="w-[130px] h-[15px] block bg-gray-700 rounded-sm"
        ></time>

        <p className="mt-2 w-full h-[10px] bg-gray-700 rounded-sm"></p>
        <p className="mt-1 w-full h-[10px] bg-gray-700 rounded-sm"></p>
        <p className="mt-1 w-full h-[10px] bg-gray-700 rounded-sm"></p>
        <p className="mt-1 w-[50%] h-[10px] bg-gray-700 rounded-sm"></p>
      </article>

      <div>
        <div className="block mt-10 mb-5 w-full px-3 rounded-md py-2.5 pe-10 shadow-sm bg-gray-700 h-[30px]"></div>

        <button
          type="submit"
          className={`inline-block rounded-lg bg-gray-700 px-5 py-3 w-[100px] h-[40px]`}
        ></button>
      </div>

      <h1 className="bg-gray-700 w-[100px] h-[40px] m-auto my-10 rounded-sm"></h1>

      <div className="block mb-5 w-full px-3 rounded-md py-3 pe-10 shadow-sm bg-gray-700 h-[80px]"></div>
      <div className="block mb-5 w-full px-3 rounded-md py-3 pe-10 shadow-sm bg-gray-700 h-[80px]"></div>
    </section>
  );
};

export default loading;
