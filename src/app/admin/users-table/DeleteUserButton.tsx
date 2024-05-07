"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminDeleteUserModel from "./AdminDeleteUserModel";

interface Props {
  userId: number;
}

const DeleteUserButton = ({ userId }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <button onClick={() => setOpenDelete(true)}>
        <AiOutlineDelete size={20} className="text-red-500 cursor-pointer" />
      </button>

      {openDelete && (
        <AdminDeleteUserModel userId={userId} setOpenDelete={setOpenDelete} />
      )}
    </>
  );
};

export default DeleteUserButton;
