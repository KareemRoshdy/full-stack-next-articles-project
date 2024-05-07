import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-start justify-between">
      <div className="h-screen w-15 lg:w-1/5 ">
        <AdminSidebar />
      </div>

      <div className="min-h-screen w-full lg:w-4/5  border-l border-gray-700">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
