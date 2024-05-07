"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import DeleteProfileModel from "./DeleteProfileModel";

type Props = {
  user: any;
};

const ProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, {
        username: username ? username : undefined,
        email: email ? email : undefined,
        password: password ? password : undefined,
      });
      setLoading(false);
      setEmail("");
      setUsername("");
      setPassword("");

      router.refresh();
      toast.success("Profile Updated");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("[Profile] Updated Profile error:", error);
    }
  };

  return (
    <div className="md:max-w-[50%] lg:max-w-[70%] mx-auto max-w-lg ">
      <form
        onSubmit={formSubmitHandler}
        className="mx-auto mb-0 mt-8 space-y-4"
      >
        <div>
          <label htmlFor="title" className="sr-only">
            Username
          </label>

          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
              placeholder="username (Optional)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="title" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
              placeholder="Email (Optional)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={`${show ? "text" : "password"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
              placeholder="Password (Optional)"
            />

            <span
              className="absolute inset-y-0 end-0 grid place-content-center px-4"
              onClick={() => setShow(!show)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`w-full flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
              loading && "cursor-no-drop"
            } ${
              password === "" &&
              username === "" &&
              email === "" &&
              "cursor-no-drop opacity-60"
            }`}
          >
            {loading ? (
              <RotatingLines
                visible={true}
                width="20"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fff"
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      <button
        className={`w-full mt-5 flex items-center justify-center rounded-lg bg-transparent border border-red-500 hover:bg-red-500 px-5 py-3 text-sm font-medium hover:text-white text-red-500 transition ${
          loading && "cursor-no-drop"
        }`}
        onClick={() => setOpenDelete(true)}
      >
        Delete Profile
      </button>

      {openDelete && (
        <DeleteProfileModel setOpenDelete={setOpenDelete} userId={user.id} />
      )}
    </div>
  );
};

export default ProfileForm;
