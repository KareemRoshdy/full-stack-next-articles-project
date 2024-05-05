import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

// Get Articles based on page number
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const { articles } = await response.json();

  return articles;
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  const { count } = (await response.json()) as { count: number };

  return count;
}

// Get Articles based on search text
export async function getArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const { articles } = await response.json();

  return articles;
}

// Get Single Article by ID
export async function getSingleArticle(id: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  const { article } = await response.json();

  return article;
}
