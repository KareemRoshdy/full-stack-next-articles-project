import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "../EditArticleForm";

interface Props {
  params: { id: string };
}

const EditArticlePage = async ({ params: { id } }: Props) => {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) return redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) return redirect("/");

  const article: Article = await getSingleArticle(id);

  return (
    <section className="p-4">
      <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl w-fit m-auto">
        Edit Article
      </h1>

      <EditArticleForm article={article} />
    </section>
  );
};

export default EditArticlePage;
