import { model, models, Schema } from "mongoose";

const FoodSchema = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = models.Food || model("Food", FoodSchema);

export default Food;
