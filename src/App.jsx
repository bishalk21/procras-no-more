/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";
import { fetchTasks, postTask } from "./helper/axiosHelper";

function App() {
 
  return (
    <>
      <div className="flex text-sm flex-col w-full h-full bg-white mx-auto p-8 items-start">
        <h1 className="font-bold text-xl mb-2">New Task</h1>
        <TimeNotify />
        <ProjectList />
        <CreateTask />
        <ListArea  />
      </div>
    </>
  );
}

export default App;
