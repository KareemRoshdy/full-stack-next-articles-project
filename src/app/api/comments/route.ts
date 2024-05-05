import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Comment } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDTO } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/comments
 * @desc    Create New Comment
 * @access  private => only logged in user
 ================================================================================================================================
 */
export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (!user) {
      return NextResponse.json(
        {
          message: "only logged in user, access denied",
        },
        { status: 401 }
      );
    }

    const body = (await req.json()) as CreateCommentDTO;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const newComment: Comment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: +body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error (comments)",
      },
      { status: 500 }
    );
  }
}

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/comments
 * @desc    GET All Comment
 * @access  private => only admin
 ================================================================================================================================
*/
export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (!user || !user?.isAdmin) {
      return NextResponse.json(
        {
          message: "only admin, access denied",
        },
        { status: 403 }
      );
    }

    const comments: Comment[] = await prisma.comment.findMany();

    return NextResponse.json(
      {
        comments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error (comments)",
      },
      { status: 500 }
    );
  }
}
