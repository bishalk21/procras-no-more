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

  useEffect(() => {
    getTasks();
  }, []);

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
      <ToastContainer />
      <div className="flex max-w-[85%] text-sm flex-col w-full h-full bg-white mx-auto pt-8 p-0 items-start">
        <h1 className="font-bold text-xl mb-2">New Task</h1>
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
    </>
  );
}

export default App;
