import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }, // max: 50, unique: true
    birthDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    tournments: { type: String, required: true },
    terms: { type: Boolean, required: true },
    informed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
