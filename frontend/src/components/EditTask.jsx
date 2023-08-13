/* eslint-disable react/prop-types */
// EditTask.jsx
import { useState } from "react";
import { editTaskAction } from "../reducers/tasks/tasksAction";
import { useDispatch } from "react-redux";

const EditTask = ({ title, editedTask, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState(editedTask);
  //   console.log(editedTask); // 64cf3fadefb1c13d4eb59a43
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  //   console.log(updatedTask); // 64cf3fadefb1c13d4eb59a43

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      //   const result = await updateTaskAll(updatedTask);
      //   console.log("updateTaskAll result:", result);

      //   if (result.status === "success") {
      //     onClose();
      //   }
      dispatch(editTaskAction(updatedTask)) && onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={onClose}>
      <h3>{title}</h3>

      <form className="flex flex-col gap-1" onSubmit={handleUpdate}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="task"
          value={updatedTask.task}
          onChange={handleChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="hours"
          value={updatedTask.hours}
          onChange={handleChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          name="date"
          value={updatedTask.date || ""}
          onChange={handleChange}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditTask;
