/* eslint-disable react/prop-types */
import { useState } from "react";

const initialState = {
  task: "",
  hours: "",
  type: "not completed",
};

const CreateTask = ({ addTask }) => {
  const [tasks, setTasks] = useState(initialState);

  // function to capture the data from search form and pass it to app.js
  const handleOnSearch = (e) => {
    // getting name and value from search form
    const { name, value } = e.target;
    // console.log(name, value);

    // updating the state
    setTasks({ ...tasks, [name]: value });
    // name in square bracket is for dynamic property name of form
  };

  // function to handle form submit and pass the tasks to app
  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevent from browser to load

    // passing the tasks to app
    // no need now sending data to database where id will be assigned
    // addTask({ ...tasks, id: uuidv4() });
    addTask(tasks);
  };

  return (
    <div className="flex w-full flex-col pb-2">
      <h3 className="font-normal text-gray-500">TITLE</h3>
      <div className="input-field relative flex flex-col gap-4 py-4">
        <div className="flex w-full gap-4 justify-between">
          <input
            type="text"
            placeholder="Task Name"
            className="text-black w-4/6"
            name="task"
            onChange={handleOnSearch}
          />
          <input
            type="number"
            className="w-2/6"
            placeholder="10"
            name="hours"
            onChange={handleOnSearch}
          />
        </div>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          id="description"
        />
        <p className="absolute bottom-4 right-0 italic transform -translate-x-1/2 -translate-y-1/2">
          (optional)
        </p>
      </div>
      <button
        onClick={handleOnSubmit}
        className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
        type="submit"
      >
        Create
      </button>
    </div>
  );
};

export default CreateTask;
