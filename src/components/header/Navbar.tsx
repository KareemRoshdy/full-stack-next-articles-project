"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface Props {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(-1);

  const pathname = usePathname();
  const pages = pathname.split("/");
  const page = pages[1];

  useEffect(() => {
    if (page.length === 0) setActive(0);
    if (page === "articles") setActive(1);
    if (page === "about") setActive(2);
    if (page === "admin") setActive(3);
  }, [page]);

  return (
    <nav aria-label="Global" className={`md:block`}>
      <ul
        className="absolute md:relative  left-0 top-[100%] links w-full bg-[#1f2937] md:bg-transparent items-left text-sm border-t border-gray-800  md:border-none flex flex-col md:flex-row gap-5 py-5 px-3 z-10"
        style={{
          transition: "0.3s",
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <li>
          <Link
            href={`/`}
            className={`transition hover:text-teal-300  ${
              active === 0 ? "text-teal-300" : "text-white"
            }`}
            onClick={() => {
              setToggle(false);
              setActive(0);
            }}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href={`/articles?pageNumber=1`}
            className={`transition hover:text-teal-300  ${
              active === 1 ? "text-teal-300" : "text-white"
            }`}
            onClick={() => {
              setToggle(false);
              setActive(1);
            }}
          >
            Articles
          </Link>
        </li>

        <li>
          <Link
            href={`/about`}
            className={`transition hover:text-teal-300  ${
              active === 2 ? "text-teal-300" : "text-white "
            }`}
            onClick={() => {
              setToggle(false);
              setActive(2);
            }}
          >
            About
          </Link>
        </li>

        {isAdmin && (
          <li>
            <Link
              href={`/admin`}
              className={`transition hover:text-teal-300 ${
                active === 3 ? "text-teal-300" : "text-white "
              }`}
              onClick={() => {
                setToggle(false);
                setActive(3);
              }}
            >
              Admin
            </Link>
          </li>
        )}
      </ul>

      <div className="block md:hidden">
        <button
          className="rounded bg-gray-100 p-2 text-white transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
