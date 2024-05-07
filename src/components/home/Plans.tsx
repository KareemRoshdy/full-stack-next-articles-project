import { TiTick } from "react-icons/ti";

const Plans = () => {
  return (
    <div className="w-3/4 md:w-2/4 lg:w-1/4 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 text-center mb-5">
      <div className="flex flex-col items-center justify-center rounded-[10px] bg-white p-4 !pt-5 sm:p-6 dark:bg-gray-900">
        <h2 className="text-3xl font-medium mb-3 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Premium
        </h2>

        <h2 className="text-3xl font-medium my-5 text-gray-900 dark:text-white line-clamp-1">
          $4.99/mo
        </h2>

        <p className="px-2 py-1 bg-[#1f2937] dark:text-gray-300 w-fit mx-auto font-semibold  rounded-full">
          10% OFF
        </p>

        <div className="mt-6">
          <h5 className="mb-1 text-2xl font-semibold  dark:text-white ">
            Top Features
          </h5>

          <p className="mt-1 flex items-center font-medium  dark:text-green-500 ">
            <TiTick /> 100 Website
          </p>

          <p className="mt-1 flex items-center font-medium  dark:text-green-500 ">
            <TiTick /> 100 GB SSD Storage
          </p>

          <p className="mt-1 flex items-center font-medium  dark:text-green-500 ">
            <TiTick /> Weekly Backups
          </p>

          <p className="mt-1 flex items-center font-medium  dark:text-green-500 ">
            <TiTick /> Unlimited Bandwidth
          </p>

          <p className="mt-1 flex items-center font-medium  dark:text-green-500 ">
            <TiTick /> Free SLL
          </p>

          <p className="mt-1 flex items-center  font-medium  dark:text-green-500 ">
            <TiTick /> Free Email
          </p>
        </div>

        <button className="block w-full rounded border border-blue-600 bg-blue-700 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto mt-8">
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default Plans;
