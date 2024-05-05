import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDTO } from "@/utils/dtos";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get Articles By Page Number
 * @access  public
 ================================================================================================================================
 */
export async function GET(req: NextRequest) {
  try {
    const pageNumber: string =
      req.nextUrl.searchParams.get("pageNumber") || "1";

    const articles: Article[] = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (+pageNumber - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        articles,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (article)" },
      { status: 500 }
    );
  }
}

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/articles
 * @desc    Create New Article
 * @access  private => Only Admin
 ================================================================================================================================
 */
export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        {
          message: "only admin, access denied",
        },
        { status: 401 }
      );
    }

    const { title, description } = (await req.json()) as CreateArticleDTO;
    const validation = createArticleSchema.safeParse({ title, description });
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(
      { message: "article created successfully", newArticle },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (article)" },
      { status: 500 }
    );
  }
}
