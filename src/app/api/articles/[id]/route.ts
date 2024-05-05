import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDTO } from "@/utils/dtos";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";

interface ArticleProps {
  params: { id: string };
}

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id
 * @access  public
 ================================================================================================================================
 */
export async function GET(req: NextRequest, { params }: ArticleProps) {
  try {
    const { id } = params;
    const article: Article | null = await prisma.article.findUnique({
      where: {
        id: +id,
      },
      include: {
        comments: {
          include: {
            user: {
              select: { username: true },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        article,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `internal server error (article-${params.id})`,
      },
      { status: 500 }
    );
  }
}

/**
 ================================================================================================================================
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Article
 * @access  private => only admin
 ================================================================================================================================
 */
export async function PUT(req: NextRequest, { params }: ArticleProps) {
  try {
    const { id } = params;

    const user = verifyToken(req);

    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        {
          message: "only admin, access denied",
        },
        { status: 403 }
      );
    }

    const article: Article | null = await prisma.article.findUnique({
      where: { id: +id },
    });

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    const { title, description } = (await req.json()) as UpdateArticleDTO;

    const updatedArticle = await prisma.article.update({
      where: { id: +id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(
      {
        message: "Article updated successfully",
        updatedArticle,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `internal server error (article-${params.id})`,
      },
      { status: 500 }
    );
  }
}

/**
 ================================================================================================================================
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    DELETE Article
 * @access  private => only admin
 ================================================================================================================================
 */
export async function DELETE(req: NextRequest, { params }: ArticleProps) {
  try {
    const { id } = params;

    const user = verifyToken(req);

    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        {
          message: "only admin, access denied",
        },
        { status: 403 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: +id },
      include: {
        comments: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    // Deleting the article
    await prisma.article.delete({
      where: { id: +id },
    });

    // Deleting the comments that belong to this article
    const commentsIds: number[] = article?.comments.map(
      (comment) => comment.id
    );

    await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } });

    return NextResponse.json(
      {
        message: "Article deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `internal server error (article-${params.id})`,
      },
      { status: 500 }
    );
  }
}
