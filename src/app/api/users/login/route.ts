import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LoginUserDTO } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchemas";
import { setCookie } from "@/utils/generateToken";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/users/login
 * @desc    Login User
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserDTO;
    const validation = loginUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user: User | null = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json(
      { message: "login successfully" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error (Login)" },
      { status: 500 }
    );
  }
}
