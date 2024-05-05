import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/articles/count
 * @desc    Get Articles Count
 * @access  public
 ================================================================================================================================
 */
export async function GET() {
  try {
    const count: number = await prisma.article.count();

    return NextResponse.json(
      {
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `internal server error (article)`,
      },
      { status: 500 }
    );
  }
}
