import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import tasksReducer from "./tasks/taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

export default store;
