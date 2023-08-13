/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { fetchTaskAction } from "../../reducers/tasks/tasksAction";

const ListArea = ({ handleOnEdit }) => {
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
        handleOnEdit={handleOnEdit}
        list={entryList}
      />
      <TaskList
        title="COMPLETED"
        name="completed"
        handleOnEdit={handleOnEdit}
        list={completedList}
      />
    </>
  );
};

export default ListArea;
