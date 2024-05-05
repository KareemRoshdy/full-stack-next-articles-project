import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import DeleteCommentButton from "./DeleteCommentButton";
import { getAllComments } from "@/apiCalls/adminApiCall";

const AdminCommentsTable = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) return redirect("/");

  const comments: Comment[] = await getAllComments(token);

  return (
    <section className="p-5">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto mb-7">
        Comments
      </h1>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full text-left rtl:text-right divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Comment
                </th>
                <th className="hidden lg:inline-block  whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Created At
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comments?.map((comment: Comment) => (
                <tr key={comment.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {comment.text}
                  </td>

                  <td className="hidden lg:inline-block whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {new Date(comment.createdAt).toDateString()}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <DeleteCommentButton commentId={comment.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <Pagination
            pageNumber={+pageNumber}
            pages={pages}
            route="/admin/articles-table"
          />
        </div> */}
      </div>
    </section>
  );
};

export default AdminCommentsTable;
