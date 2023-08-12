/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import CreateTask, { CreateDateTask } from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTaskAll,
  updateTasks,
} from "./helpers/axiosHelper";
import { MemoizedCustomModal } from "./components/modal/CustomModal";
import EditTask from "./components/EditTask";
const MemoizedTimeNotify = React.memo(TimeNotify);
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "./reducers/users/userAction";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [editedTask, setEditedTask] = useState({
    _id: "64cf2f8031fdfa65c92c759c", // Replace this with the actual task _id
    task: "Task Title",
    hours: 5,
    date: "2023-08-08",
    type: "completed",
  });
  const [tasksList, setTasksList] = useState([]);
  const [ids, setIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [taskNotifications, setTaskNotifications] = useState({
    count: 0,
    tasks: [],
    isModalOpen: false,
    newTask: null, // Store the details of the new task to display in the notification
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getTasks();
  }, []);

  const handleOnLogout = () => {
    // sessionStorage.removeItem("user");
    dispatch(userLogoutAction());
    navigate("/");
  };

  const handleOnEdit = (task) => {
    // console.log("Editing tas k with _id:", task._id); // Editing task with _id: undefined
    setEditedTask(task);
    setShowEdit(true);
  };

  const getTasks = async () => {
    const data = await fetchTasks();
    data.status === "success" &&
      setTasksList(data.result) &&
      setTaskNotifications((prevNotifications) => ({
        ...prevNotifications,
        tasks: data.result,
      }));
  };

  const handleOnUpdateTasks = async (task) => {
    const result = await updateTaskAll(task);
    result.status === "success" && getTasks();
  };

  const addTask = async (task) => {
    const result = await postTask(task);
    result.status === "success" &&
      getTasks() &&
      setTaskNotifications((prevNotifications) => ({
        ...prevNotifications,
        count: prevNotifications.count + 1,
        newTask: task, // Store the details of the new task
        isModalOpen: true, // Show the notification modal
      }));
  };

  const switchTask = async (_id, type) => {
    const data = await updateTasks({ _id, type });
    data.status === "success" && getTasks();
  };

  const handleOnDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    const data = await deleteTask(_id);
    if (data.status === "success") {
      getTasks();
      setIds([]);
    }
  };

  const handleTomorrowClick = useCallback(() => {
    setShowModal((prevShowModal) => !prevShowModal);
  }, []);

  return (
    <>
      <div className="flex max-w-[75%] text-sm flex-col w-full h-full bg-white mx-auto pt-8 p-0 items-start">
        <div className="flex w-full justify-between">
          <h1 className="font-bold text-xl mb-2">
            {user._id ? `Hey ${user.fullName},` : ""} Add New Task
          </h1>

          {user._id ? (
            <button
              type="submit"
              onClick={handleOnLogout}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded inline-flex gap-1 items-center"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span> Log out</span>
            </button>
          ) : (
            <>
              <div className="flex flex-row gap-1">
                <Link
                  to="/login"
                  className="bg-gray-300 max-h-10 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex gap-1 items-center"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span> Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-300 max-h-10 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex gap-1 items-center"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span> Register</span>
                </Link>
              </div>
            </>
          )}
        </div>
        <MemoizedTimeNotify
          setTaskNotifications={setTaskNotifications}
          notificationCount={taskNotifications}
          handleTomorrowClick={handleTomorrowClick}
        />
        <ProjectList />
        <CreateTask addTask={addTask} />
        <ListArea
          ids={ids}
          switchTask={switchTask}
          tasksList={tasksList}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />

        <>
          {showEdit && editedTask && (
            <MemoizedCustomModal onClose={() => setShowModal(false)}>
              <EditTask
                title="Update Task"
                editedTask={editedTask}
                UpdateTask={handleOnUpdateTasks}
                onClose={() => {
                  setShowModal(false);
                  setEditedTask(null);
                }}
              />
            </MemoizedCustomModal>
          )}
        </>

        {showModal && (
          <MemoizedCustomModal onClose={() => setShowModal(false)}>
            <CreateDateTask
              title="Create Date Task" // Provide a title for CreateDateTask
              addTask={addTask}
            />
          </MemoizedCustomModal>
        )}
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
