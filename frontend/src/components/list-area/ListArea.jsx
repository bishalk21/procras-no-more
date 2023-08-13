/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { fetchTaskAction } from "../../reducers/tasks/tasksAction";

const ListArea = ({ ids, handleOnEdit, switchTask, handleOnDelete }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaskAction());
  }, [dispatch]);

  const entryList = tasks.filter(({ type }) => type === "not completed");
  const completedList = tasks.filter(({ type }) => type === "completed");

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
