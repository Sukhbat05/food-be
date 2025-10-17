import { connectDB } from "@/lib/connectDb";
import Food from "@/lib/models/Food";
import FoodCategory from "@/lib/models/FoodCategory";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  console.log("ajil ehellleee");

  await connectDB();

  const formData = await request.formData();
  const imageFile = formData.get("image");
  console.log("IMAGE AVLAA", imageFile);

  const imageUrl = await uploadImageToCloudinary(imageFile as File);
  console.log("My zuragnii url", imageUrl);

  const foodName = formData.get("foodName") as string;
  const priceStr = formData.get("price") as string;
  const price = Number(priceStr);
  const ingredients = formData.get("ingredients") as string;
  const category = formData.get("category") as string;

  if (!foodName || !price || !ingredients || !category) {
    return NextResponse.json(
      { message: "Бүх талбарыг бөглөнө үү" },
      { status: 400 }
    );
  }

  const body = {
    foodName,
    price,
    ingredients,
    category,
    image: imageUrl,
  };
  const food = await Food.create(body);

  return NextResponse.json({ message: "Success", data: food }, { status: 200 });
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
