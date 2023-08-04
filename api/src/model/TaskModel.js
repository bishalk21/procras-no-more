import TaskSchema from "./TaskSchema.js";

// crud operations

// CREATE
export const insertTask = (task) => {
  return TaskSchema(task).save();
};

// READ
export const getTask = () => {
  return TaskSchema.find();
};

export const getTaskById = (_id) => {
  return TaskSchema.findById(_id);
};

// UPDATE
export const updateTask = (_id, type) => {
  return TaskSchema.findByIdAndUpdate(_id, { type: type }, { new: true });
};
