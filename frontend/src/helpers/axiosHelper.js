/* eslint-disable no-undef */
import axios from "axios";

// production vs development version
const rootURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8000"
    : "http://localhost:8000";

// ENDPOINT
const taskEp = rootURL + "/api/v1/task/";
const userEp = rootURL + "/api/v1/user/";

// const taskEp = "http://localhost:8000/api/v1/task/";

export const postTask = async (task) => {
  try {
    const { data } = await axios.post(taskEp, task);
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
    const { data } = await axios.get(taskEp);
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
    const { data } = await axios.patch(taskEp, task);
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

    const { data } = await axios.patch(`${taskEp}${_id}`, rest);
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
    const { data } = await axios.delete(`${taskEp}${_id}`);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postNewUser = async (user) => {
  try {
    const { data } = await axios.post(userEp, user);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
