import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProfileForm from "./ProfileForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { JWTPayload } from "@/utils/types";

export const metadata: Metadata = {
  title: "Profile",
  description: "Generated by create next app",
};

const Profile = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");
  const user: JWTPayload | null = verifyTokenForPage(token);

  return (
    <div className="p-4">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto">
        Update Your Profile
      </h1>

      <ProfileForm user={user} />
    </div>
  );
};

export default Profile;