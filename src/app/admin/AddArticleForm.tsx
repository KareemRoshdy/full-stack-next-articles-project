"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title can't be empty");
    if (description === "") return toast.error("Description can't be empty");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/articles`, {
        title,
        description,
      });
      setLoading(false);
      setDescription("");
      setTitle("");

      router.refresh();
      toast.success("Article Created");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("[Admin] create article error:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto">
        Add New Article
      </h1>

      <form
        onSubmit={formSubmitHandler}
        className="md:max-w-full mx-auto mb-0 mt-8 max-w-lg space-y-4"
      >
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>

          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md text-white"
              placeholder="Enter article title"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>

          <div className="relative">
            <textarea
              rows={10}
              cols={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent rounded-lg border-gray-700 border p-4 pe-12 text-sm shadow-md resize-none text-white"
              placeholder="Enter article description"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`w-full flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
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
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;
