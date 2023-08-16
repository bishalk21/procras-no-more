import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postTaskAction } from "../reducers/tasks/tasksAction";

const initialState = {
  task: "",
  hours: "",
  date: null,
  type: "not completed",
};

const CreateTask = ({ tomorrow }) => {
  const [taskList, setTaskList] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskList(initialState);
  }, []);

  // function to capture the data from search form and pass it to app.js
  const handleOnSearch = (e) => {
    // getting name and value from search form
    const { name, value } = e.target;
    // console.log(name, value);

    // updating the state
    setTaskList({ ...taskList, [name]: value });
    // name in square bracket is for dynamic property name of form
  };

  // function to handle form submit and pass the task to app
  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevent from browser to load

    // passing the task to app
    // no need now sending data to database where id will be assigned
    // addTask({ ...task, id: uuidv4() });
    // addTask(task);

    // Update task object to include the date from the "tomorrow" prop
    const updatedTask = { ...taskList, date: tomorrow };
    // console.log(updatedTask);
    // passing the updated task to app
    // addTask(updatedTask);
    dispatch(postTaskAction(updatedTask)) && setTaskList(initialState);
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
            value={taskList.task} // Add this line
            onChange={handleOnSearch}
          />
          <input
            type="number"
            className="w-2/6"
            placeholder="10"
            name="hours"
            value={taskList.hours} // Add this line
            onChange={handleOnSearch}
          />
        </div>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          id="description"
          value={taskList.description} // Add this line
          onChange={handleOnSearch}
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

export const withTomorrowDate = (WrappedComponent) => {
  return (props) => {
    const [date, setDate] = useState("");

    useEffect(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const initialDate = tomorrow.toISOString().slice(0, 10);
      setDate(initialDate);
    }, []); // Empty dependency array to run this effect only once on component mount

    const handleDateChange = (e) => {
      setDate(e.target.value);
    };

    return (
      <div>
        <h3 className="text-center font-bold">{props.title}</h3>
        <br />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().slice(0, 10)}
        />
        <br />
        <WrappedComponent {...props} tomorrow={date} />
      </div>
    );
  };
};

// CreateDateTask with enhanced CreateTask component
export const CreateDateTask = React.memo(withTomorrowDate(CreateTask));

export default CreateTask;
