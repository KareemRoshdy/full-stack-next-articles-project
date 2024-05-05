import Image from "next/image";
import image from "../../../../public/footer.webp";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Register - KR-CODE",
  description: "Generated by create next app",
};

const RegisterPage = () => {
  // const token = cookies().get("jwtToken")?.value;
  // if (token) redirect("/");

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create New Account</h1>
        </div>

        <RegisterForm />
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <Image
          alt=""
          src={image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default RegisterPage;