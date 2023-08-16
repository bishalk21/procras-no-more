import Task from "./TaskSchema.js";

// crud operations

// CREATE
export const insertTask = async (task) => {
  return await Task(task).save();
};

// READ
export const getTask = async (filter) => {
  return await Task.find(filter);
};

export const getTaskById = (_id) => {
  return Task.findById(_id);
};

export const updateTask = async (filter, update, options) => {
  return await Task.findOneAndUpdate(filter, update, options);
};

export const updateTaskAll = async (_id, updatedTask) => {
  return await Task.findByIdAndUpdate(_id, updatedTask, { new: true });
};

export const deleteTask = async (_id) => {
  return await Task.findByIdAndDelete(_id);
};

export const deleteAllTask = (ids) => {
  return Task.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
