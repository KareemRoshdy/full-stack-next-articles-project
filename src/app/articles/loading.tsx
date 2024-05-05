const articlesSkeleton = [1, 2, 3, 4, 5, 6];

const ArticleLoading = () => {
  return (
    <section className="fix-height m-auto mt-7 px-5 animate-pulse">
      <div className="md:w-[400px] block md:ml-auto w-full px-3 rounded-md border-gray-200 py-4 pe-10 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"></div>

      <div className="m-auto flex mt-10 items-center justify-center gap-7 flex-wrap">
        {articlesSkeleton.map((item: number) => (
          <div
            className="w-full h-[170px] md:w2/5 lg:w-1/4 rounded-xl p-0.5 shadow-xl transition bg-gray-800"
            key={item}
          >
            <div className="rounded-[10px]  p-4 sm:p-6">
              <h2 className="mb-2 h-[30px] bg-gray-900"></h2>

              <time className="block h-[15px] w-[80px]  bg-gray-900 mb-3"></time>

              <p className="mt-0.5 h-[30px] bg-gray-900 rounded-md"></p>

              <div className="mt-4 flex flex-wrap gap-1">
                <div className="whitespace-nowrap rounded-full px-2.5 py-0.5 h-[20px] w-[90px] text-xs bg-gray-900"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 text-xs font-medium mt-10 mx-auto bg-gray-800 w-[290px] h-[35px]"></div>
    </section>
  );
};

export default ArticleLoading;
