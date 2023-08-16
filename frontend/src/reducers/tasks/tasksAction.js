import { toast } from "react-toastify";
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTaskAll,
  updateTasks,
} from "../../helpers/axiosHelper";
import { setTasks } from "./taskSlice";

export const fetchTaskAction = () => async (dispatch) => {
  const { status, tasks } = await fetchTasks();
  status === "success" && dispatch(setTasks(tasks));
};

export const postTaskAction = (task) => async (dispatch) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const UserID = user ? user._id : null;
  const { status, message } = await postTask({ ...task, UserID });
  toast[status](message);
  status === "success" && dispatch(fetchTaskAction());
};

export const switchTaskAction = (_id, type) => async (dispatch) => {
  const { status } = await updateTasks(_id, type);
  status === "success" && dispatch(fetchTaskAction());
};

export const editTaskAction = (task) => async (dispatch) => {
  const { status } = await updateTaskAll(task);
  status === "success" && dispatch(fetchTaskAction());
};

export const deleteTaskAction = (_id) => async (dispatch) => {
  if (!window.confirm("Are you sure you want to delete?")) {
    return;
  }

  const { status } = await deleteTask(_id);
  if (status === "success") {
    dispatch(fetchTaskAction());
  }
};
