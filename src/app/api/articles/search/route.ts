import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/articles/search?searchText=Value
 * @desc    Get Articles By Search Text
 * @access  public
 ================================================================================================================================
 */
export async function GET(req: NextRequest) {
  try {
    const searchText = req.nextUrl.searchParams.get("searchText");
    let articles: Article[];
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }

    return NextResponse.json(
      {
        articles,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `internal server error (article)`,
      },
      { status: 500 }
    );
  }
}
