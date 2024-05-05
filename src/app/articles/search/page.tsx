import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface Props {
  searchParams: { searchText: string };
}

const SearchPage = async ({ searchParams: { searchText } }: Props) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);

  return (
    <section className="fix-height m-auto px-5 mt-10">
      {articles.length > 0 ? (
        <>
          <h1 className="text-xl font-bold">
            Articles based on:
            <span className="ms-2 text-2xl text-teal-300 font-bold">
              {searchText}
            </span>
          </h1>

          <div className="m-auto  flex mt-10 items-center justify-center gap-7 flex-wrap">
            {articles?.map((item: Article) => (
              <ArticleItem key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-xl font-bold text-red-500">
          Not found any Articles based on:
          <span className="ms-2 text-2xl text-teal-300 font-bold">
            {searchText}
          </span>
        </h1>
      )}
    </section>
  );
};

export default SearchPage;
