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

// UPDATE
export const updateTask = async (_id, type) => {
  return await Task.findByIdAndUpdate(_id, { type: type }, { new: true });
};

export const updateTaskAll = async ({ _id, ...rest }) => {
  return await Task.findByIdAndUpdate(_id, rest, { new: true });
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
