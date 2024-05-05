"use client";
import { CommentWithUser, JWTPayload } from "@/utils/types";
import { FiTrash } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import UpdateCommentModel from "./UpdateCommentModel";
import { useState } from "react";
import DeleteCommentModel from "./DeleteCommentModel";

interface Props {
  comment: CommentWithUser;
  user: JWTPayload | null;
}

const CommentItem = ({ comment, user }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="block mb-5 w-full px-3 rounded-md  py-3 pe-10 shadow-sm sm:text-sm border-gray-700 bg-gray-800 text-white">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="mt-0.5 mb-1.5 text-[17px] font-medium text-teal-300 capitalize">
            {comment.user.username}
          </h3>

          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-1 py-0.3 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
            <IoTimeOutline size={13} className="m-0" />

            <p className="whitespace-nowrap text-[10px] m-0">
              {new Date(comment.createdAt).toDateString()}
            </p>
          </span>
        </div>

        {(user?.id === comment.userId || user?.isAdmin) && (
          <div className="flex items-center gap-2">
            <LiaEdit
              className="text-green-500 cursor-pointer text-2xl"
              onClick={() => setOpenEdit(true)}
            />

            <FiTrash
              className="text-red-500 cursor-pointer text-2xl"
              onClick={() => setOpenDelete(true)}
            />
          </div>
        )}
      </div>

      <p className="mt-2 text-[17px] text-gray-300">{comment.text}</p>

      {openEdit && (
        <UpdateCommentModel
          setOpenEdit={setOpenEdit}
          comment={comment.text}
          commentId={comment.id}
        />
      )}

      {openDelete && (
        <DeleteCommentModel
          setOpenDelete={setOpenDelete}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
