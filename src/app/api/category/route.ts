import { connectDB } from "@/lib/connectDb";
import FoodCategory from "@/models/FoodCategory";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDB();
  const category = await FoodCategory.find();

  return NextResponse.json(category);
};

export const POST = async (request: Request) => {
  await connectDB();
  const body = await request.json();
  console.log("BODY", body);

  const category = await FoodCategory.create({
    categoryName: body.categoryName,
  });

  console.log(body);

  return NextResponse.json({ message: "Success", category });
};
