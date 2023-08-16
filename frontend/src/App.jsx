import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import CreateTask, { CreateDateTask } from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";
import { MemoizedCustomModal } from "./components/modal/CustomModal";
import EditTask from "./components/EditTask";
const MemoizedTimeNotify = React.memo(TimeNotify);
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "./reducers/users/userAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskAction } from "./reducers/tasks/tasksAction";

function App() {
  const [editedTask, setEditedTask] = useState({
    _id: "64cf2f8031fdfa65c92c759c", // Replace this with the actual task _id
    task: "Task Title",
    hours: 5,
    date: "2023-08-08",
    type: "completed",
  });
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
    navigate("/");
  }, [user, navigate]);

  const handleOnLogout = () => {
    dispatch(userLogoutAction());
    dispatch(fetchTaskAction()); // Fetch tasks even when the user logs out
    navigate("/");
  };

  const handleOnEdit = (task) => {
    setEditedTask(task);
    setShowEdit(true);
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
              className="bg-gray-300 max-h-10 min-w-fit hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex gap-1 items-center"
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
        <CreateTask />
        <ListArea handleOnEdit={handleOnEdit} />

        <>
          {showEdit && editedTask && (
            <MemoizedCustomModal onClose={() => setShowEdit(false)}>
              <EditTask title="Update Task" editedTask={editedTask} />
            </MemoizedCustomModal>
          )}
        </>

        {showModal && (
          <MemoizedCustomModal onClose={() => setShowModal(false)}>
            <CreateDateTask
              title="Create Date Task" // Provide a title for CreateDateTask
            />
          </MemoizedCustomModal>
        )}
      </div>
    </>
  );
}

export default App;
