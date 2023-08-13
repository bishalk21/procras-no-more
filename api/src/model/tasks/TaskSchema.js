import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    task: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    hours: {
      type: Number,
      required: true,
      max: 186,
    },
    type: {
      type: String,
      default: "not completed",
    },
    date: {
      type: Date, // Use the Date type for the date field
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
