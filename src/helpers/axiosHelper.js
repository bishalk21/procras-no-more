import axios from "axios";

const apiEp = "http://localhost:8000/api/v1/task/";

export const postTask = async (task) => {
  try {
    const { data } = await axios.post(apiEp, task);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(apiEp);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTasks = async (task) => {
  try {
    const { data } = await axios.patch(apiEp, task);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTaskAll = async (task) => {
  try {
    const { _id, ...rest } = task;

    if (!_id) {
      throw new Error("Task ID (_id) is undefined.");
    }

    const { data } = await axios.patch(`${apiEp}${_id}`, rest);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTask = async (_id) => {
  try {
    const { data } = await axios.delete(apiEp + _id);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
