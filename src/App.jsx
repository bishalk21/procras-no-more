/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import CreateTask, { CreateDateTask } from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTasks,
} from "./helpers/axiosHelper";
import CustomModal from "../api/src/model/CustomModal";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [ids, setIds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await fetchTasks();
    data.status === "success" && setTasksList(data.result);
  };

  const addTask = async (task) => {
    const result = await postTask(task);
    result.status === "success" && getTasks();
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

  const handleTomorrowClick = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <>
      <div className="flex text-sm flex-col w-full h-full bg-white mx-auto p-8 items-start">
        <h1 className="font-bold text-xl mb-2">New Task</h1>
        <TimeNotify handleTomorrowClick={handleTomorrowClick} />
        <ProjectList />
        <CreateTask addTask={addTask} />
        <ListArea
          ids={ids}
          switchTask={switchTask}
          tasksList={tasksList}
          handleOnDelete={handleOnDelete}
        />
        {showModal && (
          <CustomModal onClose={() => setShowModal(false)}>
            <CreateDateTask
              title="Tomorrow's Agenda" // Provide a title for CreateDateTask
              addTask={addTask}
            />
          </CustomModal>
        )}
      </div>
    </>
  );
}

export default App;
