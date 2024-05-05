import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDTO } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchemas";

interface Props {
  params: { id: string };
}

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/users/profile/:id
 * @desc    Get Profile
 * @access  private
 ================================================================================================================================
*/
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userPayload = verifyToken(req);

    if (userPayload === null || userPayload.id !== user.id) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        user,
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
 * @route   ~/api/users/profile/:id
 * @desc    Update Profile
 * @access  private
 ================================================================================================================================
*/
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userPayload = verifyToken(req);

    if (userPayload === null || userPayload.id !== user.id) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    const body = (await req.json()) as UpdateUserDTO;
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const { password, ...other } = updatedUser;
    return NextResponse.json(
      {
        message: "profile updated successfully",
        user: { ...other },
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
 * @method  DELETE
 * @route   ~/api/users/profile/:id
 * @desc    Delete Profile
 * @access  private
 ================================================================================================================================
*/
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        comments: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userPayload = verifyToken(req);

    if (userPayload !== null && userPayload.id !== user.id) {
      return NextResponse.json(
        {
          message: "only user can delete his profile, forbidden",
        },
        { status: 403 }
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
        message: "profile deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (Delete User)" },
      { status: 500 }
    );
  }
}
