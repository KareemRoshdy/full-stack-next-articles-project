"use client";
import { useState } from "react";
import AdminUpdatedUserModel from "./AdminUpdatedUserModel";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  userId: number;
  userRole: boolean;
}
const UpdatedUserButton = ({ userId, userRole }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      <button onClick={() => setOpenEdit(true)}>
        <FaRegEdit size={20} className="text-green-500" />
      </button>

      {openEdit && (
        <AdminUpdatedUserModel
          userId={userId}
          setOpenEdit={setOpenEdit}
          userRole={userRole}
        />
      )}
    </>
  );
};

export default UpdatedUserButton;
