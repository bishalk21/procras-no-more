/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import TaskList from "./TaskList";

const ListArea = ({ ids, tasksList, switchTask }) => {
  const entryList = tasksList.filter(({ type }) => type === "not completed");
  const completedList = tasksList.filter(({ type }) => type === "completed");

  return (
    <>
      <TaskList
        title="TASK LISTS"
        name="not completed"
        ids={ids}
        list={entryList}
        switchTask={switchTask}
      />
      <TaskList
        title="COMPLETED"
        name="completed"
        ids={ids}
        list={completedList}
        switchTask={switchTask}
      />
    </>
  );
};

export default ListArea;
