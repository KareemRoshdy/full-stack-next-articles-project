import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/users/logout
 * @desc    Logout
 * @access  public
 ================================================================================================================================
*/
export async function GET() {
  try {
    cookies().delete("jwtToken");

    return NextResponse.json(
      {
        message: "logout successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error (logout)",
      },
      { status: 500 }
    );
  }
}
