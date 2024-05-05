"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

interface Props {
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  articleId: number;
}

const AdminDeleteArticleModel = ({ setOpenDelete, articleId }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteArticleHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
      setLoading(false);
      setOpenDelete(false);

      router.refresh();
      toast.success("Article deleted successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("article delete [admin]:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm p-4 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-full lg:w-2/4 bg-gray-900 shadow-xl rounded-lg p-5 z-20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Delete Article</h2>
          <IoMdCloseCircleOutline
            size={25}
            className="cursor-pointer text-red-500"
            onClick={() => setOpenDelete(false)}
          />
        </div>

        <h2 className="text-xl text-gray-400 text-center my-10 w-full">
          Are you sure you want to delete this article
        </h2>

        <div className="flex items-center justify-between gap-7">
          <button
            type="submit"
            className={`w-1/2 rounded-lg flex items-center justify-center bg-red-500 px-5 py-3 text-sm font-medium text-white ${
              loading && "cursor-no-drop"
            }`}
            onClick={deleteArticleHandler}
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
              "Delete"
            )}
          </button>

          <button
            type="submit"
            className={`w-1/2 rounded-lg flex items-center justify-center bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
              loading && "cursor-no-drop"
            }`}
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteArticleModel;
