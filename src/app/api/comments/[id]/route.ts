import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDTO } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchemas";

interface Props {
  params: { id: string };
}

/**
 ================================================================================================================================
 * @method  PUT
 * @route   ~/api/comments/:id
 * @desc    Update Comment
 * @access  private only owner of the comment
 ================================================================================================================================
 */
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: +id,
      },
    });

    if (!comment) {
      return NextResponse.json(
        {
          message: "comment not found",
        },
        { status: 404 }
      );
    }

    const user = verifyToken(req);
    if (!user || user.id !== comment?.userId) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    const body = (await req.json()) as UpdateCommentDTO;
    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const updatedComment = await prisma.comment.update({
      where: { id: +id },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(
      {
        updatedComment,
      },
      { status: 200 }
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
 * @method  DELETE
 * @route   ~/api/comments/:id
 * @desc    Delete Comment
 * @access  private only Admin OR owner of the comment
 ================================================================================================================================
 */
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: +id,
      },
    });

    if (!comment) {
      return NextResponse.json(
        {
          message: "comment not found",
        },
        { status: 404 }
      );
    }

    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        {
          message: "no token provided, access denied",
        },
        { status: 401 }
      );
    }

    if (user.id === comment?.userId || user?.isAdmin) {
      await prisma.comment.delete({
        where: { id: +id },
      });

      return NextResponse.json(
        {
          message: "comment deleted successfully",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "you are not allowed, access denied",
      },
      { status: 403 }
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
