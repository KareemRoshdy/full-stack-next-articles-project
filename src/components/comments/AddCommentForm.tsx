"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

interface Props {
  articleId: number;
}

const AddCommentForm = ({ articleId }: Props) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (text === "") return toast.error("Please write something");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      setLoading(false);
      setText("");

      router.refresh();
      toast.success("Comment Successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="relative">
      <input
        type="text"
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="block mt-10 mb-5  w-full px-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

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
          "Comment"
        )}
      </button>
    </form>
  );
};

export default AddCommentForm;
