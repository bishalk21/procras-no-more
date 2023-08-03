/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import CompletedList from "./CompletedList";
import TaskList from "./TaskList";

const ListArea = () => {
  return (
    <>
      <TaskList />
      <CompletedList />
    </>
  );
};

export default ListArea;
