"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminDeleteCommentModel from "./AdminDeleteCommentModel";

interface Props {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <button onClick={() => setOpenDelete(true)}>
        <AiOutlineDelete size={20} className="text-red-500 cursor-pointer" />
      </button>

      {openDelete && (
        <AdminDeleteCommentModel
          commentId={commentId}
          setOpenDelete={setOpenDelete}
        />
      )}
    </>
  );
};

export default DeleteCommentButton;
