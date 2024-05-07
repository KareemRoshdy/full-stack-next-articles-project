import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BsPostcard } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import prisma from "@/utils/db";

const DashboardDetails = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) return redirect("/");

  const usersCount = await await prisma.user.count();
  const commentsCount = await prisma.comment.count();
  const articlesCount = await await prisma.article.count();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-10 ">
      <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 ">
        <div className="rounded-[10px] px-7 py-6 shadow-default bg-gray-900">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#313d4a]">
            <FiUser size={20} />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white">{usersCount}</h4>
              <span className="text-sm font-medium text-[#aeb7c0]">
                Total users
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 ">
        <div className="rounded-[10px] px-7 py-6 shadow-default bg-gray-900">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#313d4a]">
            <BsPostcard size={20} />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white">{articlesCount}</h4>
              <span className="text-sm font-medium text-[#aeb7c0]">
                Total articles
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 ">
        <div className="rounded-[10px] px-7 py-6 shadow-default bg-gray-900">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#313d4a]">
            <FaRegComments size={20} />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white">{commentsCount}</h4>
              <span className="text-sm font-medium text-[#aeb7c0]">
                Total comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;
