"use client";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";

const AdminSidebar = () => {
  const pathname = usePathname();
  const pages = pathname.split("/");
  const page = pages[pages.length - 1];

  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (page === "admin") setActive(0);
    if (page === "articles-table") setActive(1);
    if (page === "users-table") setActive(2);
    if (page === "comments-table") setActive(3);
  }, [page]);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/admin"
              className={`rounded-lg hover:bg-[#1f2937] px-4 py-2 text-sm font-medium text-white flex items-center md:justify-start justify-center mb-2 gap-4  ${
                active === 0 && "bg-[#1f2937]"
              }`}
              onClick={() => setActive(0)}
            >
              <CgMenuGridR className="text-xl " />
              <span className="hidden md:block">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/articles-table?pageNumber=1"
              className={`cursor-pointer flex items-center md:justify-start justify-center rounded-lg px-4 py-2 text-sm text-white hover:bg-[#1f2937] mb-2 gap-4 ${
                active === 1 && "bg-[#1f2937]"
              }`}
              onClick={() => setActive(1)}
            >
              <MdOutlineArticle className="text-xl" />
              <span className="hidden md:block">Articles</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/users-table"
              className={`cursor-pointer flex items-center md:justify-start justify-center rounded-lg px-4 py-2 text-sm text-white hover:bg-[#1f2937] mb-2 gap-4
              ${active === 2 && "bg-[#1f2937]"}`}
              onClick={() => setActive(2)}
            >
              <FiUser className="text-xl" />
              <span className="hidden md:block">Users</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/comments-table"
              className={`cursor-pointer flex items-center md:justify-start justify-center rounded-lg px-4 py-2 text-sm text-white hover:bg-[#1f2937] mb-2 gap-4
              ${active === 3 && "bg-[#1f2937]"}`}
              onClick={() => setActive(3)}
            >
              <FaRegComments className="text-xl" />
              <span className="hidden md:block">Comments</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
