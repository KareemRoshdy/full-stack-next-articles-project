"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminDeleteArticleModel from "./AdminDeleteArticleModel";

interface Props {
  articleId: number;
}

const DeleteArticle = ({ articleId }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <button onClick={() => setOpenDelete(true)}>
        <AiOutlineDelete size={20} className="text-red-500 cursor-pointer" />
      </button>

      {openDelete && (
        <AdminDeleteArticleModel
          articleId={articleId}
          setOpenDelete={setOpenDelete}
        />
      )}
    </>
  );
};

export default DeleteArticle;
