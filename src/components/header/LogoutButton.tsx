"use client";
import { IoExitOutline } from "react-icons/io5";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);

      router.replace("/");
      router.refresh();
      toast.success("Logout Successfully");
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.log("logout error:", error);
    }
  };

  return (
    <IoExitOutline
      size={20}
      className="text-red-500 cursor-pointer"
      onClick={logoutHandler}
    />
  );
};

export default LogoutButton;
