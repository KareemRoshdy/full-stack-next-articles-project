import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import Navbar from "./Navbar";
import { JWTPayload } from "@/utils/types";
import Logo from "../Logo";
import UserInfo from "./UserInfo";

const Header = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  const user: JWTPayload | null = verifyTokenForPage(token);

  return (
    <header className="bg-white dark:bg-gray-900 relative shadow-lg z-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6  lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1  md:flex md:items-center md:gap-12">
            <Logo />
          </div>

          <div className="flex items-center md:gap-12 ">
            <Navbar isAdmin={user?.isAdmin || false} />

            <div className="flex items-center gap-4">
              {user ? (
                <UserInfo user={user} />
              ) : (
                <>
                  <div className="md:flex md:gap-4">
                    <Link
                      className="rounded-md bg-blue-600  px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-500"
                      href="/login"
                    >
                      Login
                    </Link>

                    <div className="hidden md:flex">
                      <Link
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                        href="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
