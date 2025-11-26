import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,  // ⭐ REQUIRED WRITE TOKEN
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { productId, rating, title, comment, userName } = await req.json();

    if (!productId || !rating || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      rating,
      title,
      comment,
      userName,
      createdAt: new Date().toISOString(),
    };

    const created = await writeClient.create(newReview);

    return NextResponse.json({ success: true, review: created });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}
