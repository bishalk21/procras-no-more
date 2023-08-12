/* eslint-disable no-undef */
import { toast } from "react-toastify";
import { postLoginUser } from "../../helpers/axiosHelper";
import { setUser } from "./userSlice";

export const loginUserAction = (obj) => async (dispatch) => {
  const { status, message, user } = await postLoginUser(obj);
  toast[status](message);
  if (status === "success") {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
  }
};

export const userLogoutAction = () => (dispatch) => {
  dispatch(setUser({}));
  window.sessionStorage.removeItem("user");
};
