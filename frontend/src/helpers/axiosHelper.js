/* eslint-disable no-undef */
import axios from "axios";

// production vs development version
// const rootURL =
//   process.env.NODE_ENV === "production"
//     ? "https://procras-no-more-api.vercel.app"
//     : "http://localhost:8000";

const rootURL =
  process.env.NODE_ENV === "production"
    ? "https://procras-no-more-api.vercel.app"
    : "https://procras-no-more-api.vercel.app";

// ENDPOINT
const taskEp = rootURL + "/api/v1/task/";
const userEp = rootURL + "/api/v1/user/";

// const taskEp = "http://localhost:8000/api/v1/task/";

export const postTask = async (task) => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const UserID = user._id;
    const { data } = await axios.post(taskEp, task, {
      headers: {
        authorization: UserID,
      },
    });
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
    const user = JSON.parse(sessionStorage.getItem("user"));
    const UserID = user._id;
    const { data } = await axios.get(taskEp, {
      headers: {
        authorization: UserID,
      },
    });

    console.log(data);
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

export const postLoginUser = async (user) => {
  try {
    const { data } = await axios.post(userEp + "login", user);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
