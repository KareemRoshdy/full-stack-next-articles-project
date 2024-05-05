import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex items-start justify-between overflow-hidden">
      <div className="h-screen w-15 lg:w-1/5 ">
        <AdminSidebar />
      </div>

      <div className="h-screen w-full lg:w-4/5 p-5 ">{children}</div>
    </div>
  );
};

export default AdminLayout;
