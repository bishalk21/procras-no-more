import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
