/* eslint-disable react/prop-types */
// EditTask.jsx
import { useState } from "react";

const EditTask = ({ title, editedTask, UpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState(editedTask);
  //   console.log(editedTask); // 64cf3fadefb1c13d4eb59a43

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  //   console.log(updatedTask); // 64cf3fadefb1c13d4eb59a43

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      //   const result = await updateTaskAll(updatedTask);
      //   console.log("updateTaskAll result:", result);

      //   if (result.status === "success") {
      //     onClose();
      //   }
      UpdateTask(updatedTask);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="task"
          value={updatedTask.task}
          onChange={handleChange}
        />
        <input
          type="number"
          name="hours"
          value={updatedTask.hours}
          onChange={handleChange}
        />
        <input
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
