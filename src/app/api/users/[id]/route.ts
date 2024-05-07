import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserRoleDTO } from "@/utils/dtos";

/**
 ================================================================================================================================
 * @method  DELETE
 * @route   ~/api/users/:id
 * @desc    DELETE User
 * @access  private => only admin
 ================================================================================================================================
*/

interface Props {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const userPayload = verifyToken(req);

    if (userPayload === null || userPayload.isAdmin === false) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        comments: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Deleting User
    await prisma.user.delete({ where: { id: +id } });

    // Deleting the Comments that belong to this User
    const commentsIds = user?.comments?.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: { in: commentsIds },
      },
    });

    return NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (Delete User)" },
      { status: 500 }
    );
  }
}

/**
 ================================================================================================================================
 * @method  PUT
 * @route   ~/api/users/:id
 * @desc    Update User
 * @access  private => only admin
 ================================================================================================================================
*/

interface Props {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const { isAdmin } = (await req.json()) as UpdateUserRoleDTO;

    const userPayload = verifyToken(req);

    if (userPayload === null || userPayload.isAdmin === false) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        comments: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: {
        isAdmin: isAdmin === "false" ? false : true,
      },
    });

    return NextResponse.json(
      {
        message: "user updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
