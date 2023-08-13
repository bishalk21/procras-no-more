import { toast } from "react-toastify";
import { fetchTasks, postTask } from "../../helpers/axiosHelper";
import { setTasks } from "./taskSlice";

export const fetchTaskAction = () => async (dispatch) => {
  const { status, task } = await fetchTasks();
  console.log(task);
  status === "success" && dispatch(setTasks(task));
};

export const postTaskAction = (task) => async (dispatch) => {
  // getting user id from sessionstorage
  // JSON.parse to convert string to objext
  const user = JSON.parse(sessionStorage.getItem("user"));
  const UserID = user._id;
  const { status, message } = await postTask({ ...task, UserID });
  toast[status](message);
  status === "success" && dispatch(fetchTaskAction());
};
