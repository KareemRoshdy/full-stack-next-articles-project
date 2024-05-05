import { Article } from "@prisma/client";
import Link from "next/link";

type Props = {
  item: Article;
};

const ArticleItem = ({ item }: Props) => {
  return (
    <article className="w-full md:w2/5 lg:w-1/4 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25">
      <div className="rounded-[10px] bg-white p-4 !pt-5 sm:p-6 dark:bg-gray-900">
        <h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-white line-clamp-1">
          {item.title}
        </h2>
        <time
          dateTime="2022-10-10"
          className="block text-xs text-gray-500 dark:text-gray-400"
        >
          10th Oct 2022
        </time>

        <a href="#">
          <p className="mt-0.5  font-medium  dark:text-gray-300 line-clamp-1">
            {item.description}
          </p>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <Link
            href={`/articles/${item.id}`}
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
