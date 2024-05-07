import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { User } from "@prisma/client";
import { getAllUsers } from "@/apiCalls/adminApiCall";
import DeleteUserButton from "./DeleteUserButton";
import UpdatedUserButton from "./UpdatedUserButton";

const AdminUserTable = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) return redirect("/");

  const users: User[] = await getAllUsers(token);

  return (
    <section className="p-5">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto mb-7">
        Users
      </h1>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full text-left rtl:text-right divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  User
                </th>
                <th className="hidden lg:inline-block  whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users?.map((user: User) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </td>

                  <td className="hidden lg:inline-block whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <UpdatedUserButton
                        userId={user.id}
                        userRole={user.isAdmin}
                      />

                      <DeleteUserButton userId={user.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminUserTable;
