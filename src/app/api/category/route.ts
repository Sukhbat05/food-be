
import FoodCategory from "@/lib/models/FoodCategory";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";

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

export const DELETE = async (request: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing category id" }, { status: 400 });
    }

    const deleted = await FoodCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE /food-category error:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 200 }
    );
  }
};