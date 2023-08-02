import "./App.css";
import CreateTask from "./components/CreateTask";
import ProjectList from "./components/ProjectList";
import TimeNotify from "./components/TimeNotify";
import ListArea from "./components/list-area/ListArea";

function App() {
  return (
    <>
      <div className="flex text-sm flex-col w-full h-full bg-white mx-auto p-8 items-start">
        <h1 className="font-bold text-xl mb-2">New Task</h1>
        <TimeNotify />
        <ProjectList />
        <CreateTask />
        {/* <hr className="w-full h-1 bg-black mt-2" /> */}
        <ListArea />
      </div>
    </>
  );
}

export default App;
