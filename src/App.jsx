/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";
import { fetchTasks, postTask, updateTasks } from "./helpers/axiosHelper";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await fetchTasks();
    data.status === "success" && setTasksList(data.result);
  };

  const addTask = (task) => {
    const result = postTask(task);
    result.status === "success" && getTasks();
  };

  const switchTask = async (_id, type) => {
    const data = await updateTasks({ _id, type });
    data.status === "success" && getTasks();
  };

  return (
    <>
      <div className="flex text-sm flex-col w-full h-full bg-white mx-auto p-8 items-start">
        <h1 className="font-bold text-xl mb-2">New Task</h1>
        <TimeNotify />
        <ProjectList />
        <CreateTask addTask={addTask} />
        <ListArea ids={ids} switchTask={switchTask} tasksList={tasksList} />
      </div>
    </>
  );
}

export default App;
