"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Username can't be empty");
    if (email === "") return toast.error("Email can't be empty");
    if (password === "") return toast.error("Password can't be empty");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      setLoading(false);

      router.replace("/");
      router.refresh();
      toast.success("Register Successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("login error:", error);
    }
  };

  return (
    <form
      onSubmit={loginSubmitHandler}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <div>
        <label htmlFor="email" className="sr-only">
          Full Name
        </label>

        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
            placeholder="Enter Name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
            placeholder="Enter email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
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
            placeholder="Enter password"
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
        <p className="text-sm text-gray-500">
          Have an account?
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </p>

        <button
          type="submit"
          className={`inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
            loading && "cursor-no-drop"
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
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
