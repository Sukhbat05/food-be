import { connectDB } from "@/lib/connectDb";
import Food from "@/lib/models/Food";
import FoodCategory from "@/lib/models/FoodCategory";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const body = await request.json();

    console.log("body", body);
    const food = await Food.create(body);

    return NextResponse.json(
      { message: "Success", data: food },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      error: error.message,
      status: 500,
    });
  }
};

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const food = await Food.find();
    return NextResponse.json({ message: "Success", data: food });
  } catch (error) {
    FoodCategory;
    return NextResponse.json({ error: "Failed" });
  }
};
