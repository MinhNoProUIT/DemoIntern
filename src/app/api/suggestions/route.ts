// File: src/app/api/suggestions/route.ts

import { NextResponse } from "next/server";

// Hàm xử lý cho phương thức POST
export async function POST(request: Request) {
  try {
    // Lấy dữ liệu từ body của request
    const { viewedIds, likedIds } = await request.json();

    // In ra console của server để gỡ lỗi
    console.log("[App Router API LOG] Received data:", { viewedIds, likedIds });

    if (!viewedIds || !likedIds) {
      return NextResponse.json(
        { message: "Missing viewedIds or likedIds" },
        { status: 400 }
      );
    }

    // Trả về dữ liệu JSON thành công
    return NextResponse.json(
      {
        message: "API (App Router) received data successfully",
        data: {
          receivedViewed: viewedIds,
          receivedLiked: likedIds,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[App Router API ERROR]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
