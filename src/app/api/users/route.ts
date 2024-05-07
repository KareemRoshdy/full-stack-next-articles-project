import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/users
 * @desc    Get All Users
 * @access  private => only admin
 ================================================================================================================================
*/
export async function GET(req: NextRequest) {
  try {
    const userPayload = verifyToken(req);

    if (userPayload === null || userPayload.isAdmin === false) {
      return NextResponse.json(
        {
          message: "you are not allowed, access denied",
        },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
      },
    });

    return NextResponse.json(
      {
        users,
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
