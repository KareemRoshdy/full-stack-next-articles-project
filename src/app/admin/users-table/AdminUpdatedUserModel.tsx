"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

interface Props {
  userRole: boolean;
  userId: number;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
}

const AdminUpdatedUserModel = ({ userId, setOpenEdit, userRole }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(userRole);

  const UpdateUserHandler = async () => {
    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/users/${userId}`, {
        isAdmin: role,
      });
      setLoading(false);
      setOpenEdit(false);

      router.refresh();
      toast.success("User updated successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.log("user delete [admin]:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm p-4 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-full lg:w-2/4 bg-gray-900 shadow-xl rounded-lg p-5 z-20 overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Edit User Role</h2>
          <IoMdCloseCircleOutline
            size={25}
            className="cursor-pointer text-red-500"
            onClick={() => setOpenEdit(false)}
          />
        </div>

        <div className="">
          <select
            name="HeadlineAct"
            value={`${role}`}
            id="HeadlineAct"
            className="w-full  bg-transparent rounded-lg border-gray-700 border p-4 pe-12 my-5 text-sm shadow-md text-white"
            onChange={(e: any) => setRole(e.target.value)}
          >
            <option className="w-fit bg-gray-800 text-white" value="true">
              Admin
            </option>
            <option className="w-full bg-gray-800 text-white" value="false">
              User
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-7">
          <button
            type="submit"
            className={`w-1/2 rounded-lg flex items-center justify-center bg-green-500 px-5 py-3 text-sm font-medium text-white ${
              loading && "cursor-no-drop"
            }`}
            onClick={UpdateUserHandler}
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

          <button
            type="submit"
            className={`w-1/2 rounded-lg flex items-center justify-center bg-blue-500 px-5 py-3 text-sm font-medium text-white ${
              loading && "cursor-no-drop"
            }`}
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdatedUserModel;
