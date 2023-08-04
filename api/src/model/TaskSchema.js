import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
