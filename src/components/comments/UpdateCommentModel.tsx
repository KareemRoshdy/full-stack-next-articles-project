"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

interface Props {
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  comment: string;
  commentId: number;
}

const UpdateCommentModel = ({ setOpenEdit, comment, commentId }: Props) => {
  const router = useRouter();
  const [text, setText] = useState(comment);
  const [loading, setLoading] = useState(false);

  const editFormHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (text === "") return toast.error("Comment can not be empty");

    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text,
      });
      setLoading(false);
      setOpenEdit(false);
      router.refresh();
      toast.success("Comment updated successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("login error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm p-4 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-full md:w-2/4 bg-gray-900 shadow-xl rounded-lg p-5 z-20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Edit Comment</h2>
          <IoMdCloseCircleOutline
            size={25}
            className="cursor-pointer text-red-500"
            onClick={() => setOpenEdit(false)}
          />
        </div>

        <form onSubmit={editFormHandler}>
          <input
            type="text"
            id=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Edit comment..."
            className="block mt-5 mb-5  w-full px-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className={`w-full rounded-lg flex items-center justify-center bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
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
              "Edit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModel;
