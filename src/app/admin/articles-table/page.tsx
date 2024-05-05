import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/articles/Pagination";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import DeleteArticle from "./DeleteArticle";

interface Props {
  searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({ searchParams: { pageNumber } }: Props) => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) return redirect("/");

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto mb-7">
        Articles
      </h1>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full text-left rtl:text-right divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Title
                </th>
                <th className="hidden lg:inline-block  whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Created At
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Actions
                </th>
                <th className=" whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  View
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {articles?.map((article: Article) => (
                <tr key={article.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </td>

                  <td className="hidden lg:inline-block whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {new Date(article.createdAt).toDateString()}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/articles-table/edit/${article.id}`}>
                        <FaRegEdit size={20} className="text-green-500" />
                      </Link>

                      <DeleteArticle articleId={article.id} />
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <Link href={`/articles/${article.id}`}>
                      <FaRegEye
                        size={20}
                        className="text-blue-600 cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <Pagination
            pageNumber={+pageNumber}
            pages={pages}
            route="/admin/articles-table"
          />
        </div>
      </div>
    </section>
  );
};

export default AdminArticlesTable;
