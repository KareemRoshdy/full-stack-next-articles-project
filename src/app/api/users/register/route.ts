import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { RegisterUserDTO } from "@/utils/dtos";
import { User } from "@prisma/client";
import { registerUserSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/users/register
 * @desc    Create New User
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserDTO;

    const validation = registerUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user: User | null = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    return NextResponse.json(
      {
        message: "Register successfully",
        newUser,
      },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (Register)" },
      { status: 500 }
    );
  }
}
