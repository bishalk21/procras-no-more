/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import TaskList from "./TaskList";

const ListArea = ({
  ids,
  handleOnEdit,
  tasksList,
  switchTask,
  handleOnDelete,
}) => {
  const entryList = tasksList.filter(({ type }) => type === "not completed");
  const completedList = tasksList.filter(({ type }) => type === "completed");

  return (
    <>
      <TaskList
        title="TASK LISTS"
        name="not completed"
        ids={ids}
        handleOnEdit={handleOnEdit}
        list={entryList}
        switchTask={switchTask}
        handleOnDelete={handleOnDelete}
      />
      <TaskList
        title="COMPLETED"
        name="completed"
        ids={ids}
        handleOnEdit={handleOnEdit}
        list={completedList}
        switchTask={switchTask}
        handleOnDelete={handleOnDelete}
      />
    </>
  );
};

export default ListArea;
