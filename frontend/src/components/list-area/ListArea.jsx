import { useDispatch, useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { fetchTaskAction } from "../../reducers/tasks/tasksAction";

const ListArea = ({ handleOnEdit }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskAction()); // Fetch tasks when component mounts
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
