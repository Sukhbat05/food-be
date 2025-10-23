import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const User = models.User || model("FoodCategory", UserSchema);

export default User;
